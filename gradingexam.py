import cv2
# import math
import numpy as np
# import random
import base64
import io
from imutils.perspective import four_point_transform
# from imutils import contours
import imutils
import sys
import json
import urllib.request

def get_contour_precedence(contour, cols):
    tolerance_factor = 10
    origin = cv2.boundingRect(contour)
    return ((origin[1] // tolerance_factor) * tolerance_factor) * cols + origin[0]


def crop(img, rect):
    (x, y, w, h) = rect
    return img[y: y + h, x: x + w]


def getSheet(origin, gray):
    canny = cv2.Canny(gray, 70, 120)
    cnts = cv2.findContours(canny, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)

    if len(cnts) < 0:
        return None

    docCnt = None

    for c in cnts:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)
        if len(approx) == 4:
            docCnt = approx
            break

    paper = imutils.resize(four_point_transform(origin, docCnt.reshape(4, 2)), width=600)
    paperGray = imutils.resize(four_point_transform(gray, docCnt.reshape(4, 2)), width=600)

    paper = paper[100:paper.shape[0] - 200, 40:paper.shape[1] - 40]
    paperGray = paperGray[100:paperGray.shape[0] - 200, 40:paperGray.shape[1] - 40]

    return paper, paperGray


###############################################################################
# convert base64
# url=sys.argv[2]
# url1 = url.split(',')[1]

# im_bytes = base64.b64decode(url1)
# im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
# origin = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)

req = urllib.request.urlopen(sys.argv[2])
arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
origin = cv2.imdecode(arr, -1)

# origin = cv2.imread("2329.jpg")
imgHeight, imgWidth, _ = origin.shape
gray = cv2.cvtColor(origin, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (5, 5), 0)

#detect tờ giấy, cần optimize lại hoặc lựa background nào dễ hơn
blurred = cv2.GaussianBlur(blurred, (5, 5), 0)
blurred = cv2.GaussianBlur(blurred, (5, 5), 0)
blurred = cv2.GaussianBlur(blurred, (5, 5), 0)
# cv2.imshow("blurred", blurred)
# cv2.waitKey()
canny = cv2.Canny(blurred,50, 150)  # mấy số này mò thôi
# cv2.imshow("canny", canny)
# cv2.waitKey()
cnts = cv2.findContours(canny, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[0]
docCnt = None
for c in cnts:
    peri = cv2.arcLength(c, True)
    approx = cv2.approxPolyDP(c, 0.02 * peri, True)
    if len(approx) == 4:
        docCnt = approx
        break

paper = imutils.resize(four_point_transform(origin, docCnt.reshape(4, 2)), width=550)
# cv2.imshow("paper", paper)
# cv2.waitKey()

#Có tờ giấy rồi thì addWeight làm đậm, tìm contours cho rõ
filtered = cv2.addWeighted(paper, 4, cv2.blur(paper, (50, 50)), -4, 150)
paperGray = cv2.cvtColor(filtered, cv2.COLOR_BGR2GRAY)
thresh = cv2.threshold(paperGray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

# cv2.imshow("filtered", filtered)
# cv2.waitKey()

#cái này là vị trí của answer sheet trên tờ giấy, còn mã đề thì vị trí khác, cũng làm tương tụ
answerSheet = crop(paper, (150, 0, thresh.shape[1], thresh.shape[0]))  # cắt phần ảnh bên ô trả lời
answerSheetThresh = crop(thresh, (150, 0, thresh.shape[1], thresh.shape[0]))

# Tìm và đánh số thứ tự ô trả lời
ANSWER_PER_QUESTION = 4
ANSWER_COLUMN = 2
QUESTION_PER_COLUMN = 20
bubbles = []
index = 0
cnts, hierarchy = cv2.findContours(answerSheetThresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

cv2.drawContours(answerSheet, cnts, -1, (0,255,0), 1)
# cv2.imshow("answerSheet", answerSheet)
# cv2.waitKey()

cnts.sort(key=lambda x: get_contour_precedence(x, thresh.shape[1]))  # sort contours từ left-to-right rồi top-to-bottom
for i, cnt in enumerate(cnts):
    (x, y, w, h) = cv2.boundingRect(cnt)
    #thấy mấy ô dao động từ 14 2x
    if 13 < w < 25 and 12 < h < 25:  # mấy cái số này cố định do mình resize ảnh phía trên rồi
        colIndex = int(index / ANSWER_PER_QUESTION)
        qNum = (colIndex % ANSWER_COLUMN) * QUESTION_PER_COLUMN + int(colIndex / ANSWER_COLUMN)
        aNum = index % ANSWER_PER_QUESTION
        bubbles.append((qNum, aNum, cnt))
        # cv2.rectangle(answerSheet, (x, y), (x+w, y+h), color=(0,255, 0), thickness=2)
        # cv2.putText(answerSheet, str(aNum) , (x, y + 3), cv2.FONT_HERSHEY_SIMPLEX, .4, (255, 0, 0), 2)
        index = index + 1

# cv2.imshow("answerSheet", answerSheet)
# cv2.waitKey()
bubbles.sort(key=lambda x: x[0])  # sắp lại câu hỏi

#######################################################################################

# Tìm ô được tô trong ô trả lời
count = 0
result = {}
for b in bubbles:
    (qNum, aNum, cnt) = b

    mask = np.zeros(answerSheetThresh.shape, dtype="uint8")  # hình rỗng
    cv2.drawContours(mask, [cnt], -1, 255, -1)  # vẽ solid lên hình rỗng
    mask = cv2.bitwise_and(answerSheetThresh, answerSheetThresh, mask=mask)  # Hình Thresh-AND-Hình Mask
    totalBlackPx = cv2.countNonZero(mask)  # Đêm px đen

    if totalBlackPx > 150:  # có tô

        if str(qNum) in result:
            result[str(qNum)].append((aNum, cnt))  # tô nhiều lần
        else:
            result[str(qNum)] = [(aNum, cnt)]

    else:  # không tô
        if str(qNum) in result:
            result[str(qNum)].append((-1, cnt))
        else:
            result[str(qNum)] = [(-1, cnt)]

# Kiểm tra câu hợp lệ
resultInvalidate = {}
for key in result:
    countSolid = sum(r[0] > -1 for r in result[key])
    resultInvalidate[key] = countSolid == 1

ab=sys.argv[1].split(',')
num=[]



for x in range(50-len(ab)):
    ab.append(-3)
for x in range(len(ab)):
    num.append(str(x))
ac=[]
for i in range(len(ab)):
    t = int(ab[i])
    ac.append(t)
trueanswer=dict(zip(num,ac))


# tính kết quả
# ANSWER_KEY = {'0': 0, '1': 3, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27':0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0, '38': 0, '39': 0,'40':0,'41': 0, '42': 0, '43': 0, '44': 0, '45': 0, '46': 0, '47':0, '48': 0, '49': 0}
#for i in range(40):
#    ANSWER_KEY[str(i)] = random.choice([0, 1, 2, 3])
ANSWER_KEY=trueanswer
# Example
# {'0': 1, '1': 3, '2': 2, '3': 1, '4': 2, '5': 1, '6': 3, '7': 3, '8': 2, '9': 2, '10': 1, '11': 2, '12': 2, '13': 3, '14': 3, '15': 3, '16': 2, '17': 0, '18': 3, '19'
# : 3, '20': 1, '21': 0, '22': 0, '23': 0, '24': 1, '25': 1, '26': 1, '27': 2, '28': 2, '29': 1, '30': 0, '31': 2, '32': 2, '33': 1, '34': 1, '35': 3, '36': 3, '37': 2,
#  '38': 2, '39': 2}

correctCount = 0
for key in result:
    if ANSWER_KEY[key]!=-3:
        ansIndex = ANSWER_KEY[key]
        correctCnt = result[key][ansIndex][1]
        # print(len(ANSWER_KEY))
        if resultInvalidate[key] == True:  # Câu hợp lệ
            if result[key][ansIndex][0] == ansIndex:  # So sánh index ô tô trong sheet vs index của ANSWER_KEY
                correctCount = correctCount + 1
                cv2.drawContours(answerSheet, [correctCnt], -1, (0, 255, 0), -1)  # BGR
            else:
                cv2.drawContours(answerSheet, [correctCnt], -1, (0, 0, 255), -1)
        else:  # Câu không tô hoặc tô nhiều lần
            cv2.drawContours(answerSheet, [correctCnt], -1, (0, 0, 255), -1)
    else:
        continue



text = 'Corect: {} -- Score: {}'.format(correctCount, correctCount / len(ANSWER_KEY) * 10)
cv2.putText(answerSheet, str(text), (30, 30), cv2.FONT_HERSHEY_SIMPLEX, .7, (255, 0, 0), 2)
jpg_img = cv2.imencode('.jpg', answerSheet)
my_string = base64.b64encode(jpg_img[1]).decode('utf-8')
# print(correctCount)
# print("data:image/jpg;base64,"+my_string)
resultdata={
    "image":"data:image/jpg;base64,"+my_string,
    "correctquestion":correctCount,
    "nameStudent":sys.argv[3],
    "totalqs":sys.argv[4]
}

print (json.dumps(resultdata))
# cv2.imshow("codeSheet", answerSheet)
# cv2.waitKey()
