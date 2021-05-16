import { Component } from "react";
import { saveAs } from "file-saver";
import {
  Document,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Footer,
  Header,
  PageNumber,
} from "docx";
// Tran Do Anh Khoa 5/11/2021
//const imageBase64Data = `iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAANqSURBVO3BMW7sWBAEwawG73/lXBlrtPUAghxJX6iI+IWq/w1Vy1C1DFXLULUMVctQtQxVy1C1DFXLULUMVctQtQxVy1C1DFXLxUNJ+E4qJ0nYVO5IwqayJWFTOUnCd1J5YqhahqplqFouXqbypiTcoXJHEk6ScJKETeVE5U1JeNNQtQxVy1C1XHxYEu5QuSMJn6SyJeFNSbhD5ZOGqmWoWoaq5eKPUTlJwonKloQTlb9kqFqGqmWoWi7+mCTcoXKicpKETeVfNlQtQ9UyVC0XH6byk1S2JGxJ2FROkvAmld9kqFqGqmWoWi5eloSfpLIlYVPZknCShE1lS8IdSfjNhqplqFqGquXiIZXfTGVLwhNJuEPlXzJULUPVMlQt8QsPJGFT2ZLwJpWTJNyh8klJeJPKJw1Vy1C1DFXLxcuScIfKHUnYVE5UtiScJOFEZUvCprKpbEnYVLYkbCpbEjaVNw1Vy1C1DFXLxTdTOUnCicpPSsJJEk5UtiRsKnckYVN5YqhahqplqFoufhmVO5Jwh8odKlsSNpU7knCShE3lOw1Vy1C1DFXLxUMqWxKeSMKJyonKHUnYVLYk3JGEE5UtCSdJ+E5D1TJULUPVEr/wQBI+SeWOJGwqn5SETeVNSdhUPmmoWoaqZaha4hceSMKm8kQS7lA5ScIdKidJ2FTuSMKmsiXhCZUnhqplqFqGquXil1E5ScIdKlsSNpWTJGwqWxLepPKThqplqFqGquXiw5KwqdyRhE1lS8Km8iaVT0rCHSpbEjaVJ4aqZahahqolfuEfloQ7VLYkvEnljiRsKidJ2FTeNFQtQ9UyVC0XDyXhO6lsKlsS7lDZknCisiXhJAmbykkS7kjCpvLEULUMVctQtVy8TOVNSThJwqayJeEkCScqT6jcoXKShE8aqpahahmqlosPS8IdKm9SuUNlS8IdSXgiCScqWxLeNFQtQ9UyVC0Xf0wSTlQ2lROVO5JworIl4Y4kfNJQtQxVy1C1XPwxKlsStiScqDyhcpKETeWJJLxpqFqGqmWoWi4+TOWTVLYkbCpbEjaVkyQ8obKp/GZD1TJULUPVcvGyJHynJGwqb1J5Ign/kqFqGaqWoWqJX6j631C1DFXLULUMVctQtQxVy1C1DFXLULUMVctQtQxVy1C1DFXLULX8B/lmaSGuDDKdAAAAAElFTkSuQmCC`;

class Exportdocx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
    };
  }
  componentDidMount() {
    console.log(this.props.data);
    let data = this.props.data;

    let getimage = data["qrimage"].split(";base64,").pop();

    this.setState({
      imageBase64Data: getimage,
      data: data["exammixed"][this.props.index],
      rawdata: this.props.data,
    });
  }
  //Xử lý dữ liệu in ra file docx
  generate = () => {
    console.log(this.state.rawdata);
    const doc = new Document({
      // Nội dung file docx
      sections: [
        {
          // Header
          headers: {
            //   Noi dung header
            default: new Header({
              children: [new Paragraph("Facuty Partner")],
            }),
          },
          //   Footer
          footers: {
            //  Noi dung footer
            default: new Footer({
              children: [
                // Sô trang file docx
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    //   Số trang hiện tại
                    new TextRun({
                      children: ["Page Number: ", PageNumber.CURRENT],
                    }),
                    // Tổng sô trang
                    new TextRun({
                      children: ["|", PageNumber.TOTAL_PAGES],
                    }),
                  ],
                }),
              ],
            }),
          },
          //   Nôi dung chính
          children: [
            //   Phần hiển thị QR code và mã đề
            new Paragraph({
              children: [
                new ImageRun({
                  data: Uint8Array.from(atob(this.state.imageBase64Data), (c) =>
                    c.charCodeAt(0)
                  ),
                  transformation: {
                    width: 50,
                    height: 50,
                  },
                  floating: {
                    horizontalPosition: {
                      offset: 1014400,
                    },
                    verticalPosition: {
                      offset: 1014400,
                    },
                  },
                }),
                new TextRun({
                  text: `${this.state.data["idexam"]}`,
                  bold: true,
                  size: "18pt",
                  color: "000000",
                }),
              ],
              alignment: AlignmentType.RIGHT,
            }),

            // Phần hiển thị tiêu đề
            new Paragraph({
              children: [
                new TextRun({
                  text: `${this.state.rawdata["titles"]}`,
                  bold: true,
                  size: "18pt",
                  color: "000000",
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.CENTER,
            }),
            // Cách dòng
            new Paragraph({}),
            // Hiển thị thời gian làm bài
            new Paragraph({
              children: [
                new TextRun({
                  text: `${this.state.rawdata["timedoexam"]}`,
                  bold: true,
                  size: "14pt",
                  color: "000000",
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.CENTER,
              Break: 2,
            }),
            // Cách dòng
            new Paragraph({}),

            // Render dữ liều câu hỏi và đáp án
            ...this.CreateExam(this.state.data).map((index) => {
              return index;
            }),
          ],
        },
      ],
    });
    //Xử lý xuất file word
    this.DownloadFile(doc);
  };

  DownloadFile = (doc) => {
    //Xử lý xuất file word
    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
    console.log(this.state.data);
  };
  //Kiểm tra tổng các ký từ đáp án của 1 câu hỏi
  //Phân chia hiển thị đáp án theo từng dòng hoặc 1 dòng
  Checklength = (data) => {
    let count = false;
    data.map((index) => {
      if (index.length + 2 > 16) count = true;
    });
    return count;
  };

  //Xuất câu hỏi và đáp án
  CreateExam(data) {
    let question = data["questions"];
    var arrData = [];
    Object.keys(question).map((value, index) => {
      //Nhận câu hỏi
      arrData.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${index + 1}.`, size: "14pt", bold: true }),
            new TextRun({
              text: `${question[value].Question}`,
              size: "14pt",
            }),
          ],
          spacing: {
            after: 100,
            before: 100,
          },
        })
      );
      //Nhân dữ liệu câu các câu trả lời
      this.CreateAnswer(question[value].Answer).map((index) => {
        arrData.push(index);
      });
    });
    return arrData;
  }
  //   Xử lý hiển thị đáp án và chọn hình thức hiển thị
  CreateAnswer(arrAnswer) {
    // Mảng ký tự đáp án
    let Answer = ["A", "B", "C", "D", "E", "F", "G"];
    //Mảng tiếp nhận đáp án
    const arr = [];
    // Kiểm tra nếu có một đáp án có ký từ trên 16 trả về true
    if (this.Checklength(arrAnswer)) {
      arrAnswer.map((value, index) => {
        arr.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${Answer[index]}.`, size: "14pt" }),
              new TextRun({
                text: `${value}`,
                size: "14pt",
              }),
            ],
          })
        );
      });
    } else {
      let dataQuestion = [];
      dataQuestion.push(
        new Paragraph({
          children: [
            ...arrAnswer.map((value, index) => {
              if (index + 1 == arrAnswer.length) {
                return new TextRun({
                  text: `${Answer[index]}.${value}`,
                  size: "14pt",
                });
              } else {
                if (value.length > 12) {
                  if (index != 0) {
                    return new TextRun({
                      text: `${Answer[index]}.${value}\t\t`,
                      size: "14pt",
                    });
                  } else {
                    return new TextRun({
                      text: `${Answer[index]}.${value}\t`,
                      size: "14pt",
                    });
                  }
                } else {
                  return new TextRun({
                    text: `${Answer[index]}.${value}\t\t`,
                    size: "14pt",
                  });
                }
              }
            }),
          ],
        })
      );
      dataQuestion.map((index) => {
        arr.push(index);
      });
    }
    return arr;
  }
  render() {
    return (
      <>
      <div className='row pb-3'>
        <div className='col-md-10 col-sm-7'>

        </div>
        <div className='col-md-2 col-sm-5'>
          <button
            type="button"
            className="btn btn-success float-right"
            onClick={this.generate}
          >
            Tải về
          </button>

        </div>
  
        </div>
      </>
    );
  }
}
export default Exportdocx;
