import json
exam =[   {
            "Question": " The circle is the ...............symbol.xin chào",
            "Answer": [
                " Decision ",
                " Stop",
                " Start",
                " Connector"
            ],
            "Trueanswer": [
                " Start"
            ],
            "image": [
                "image1.jgeg",
                "image1.jgeg"
            ]
        },
        {
            "Question": " ............looks like a rounded rectangle.bạn khoẻ không",
            "Answer": [
                " The ordinary rectangle ",
                " The ellipse",
                " The rectangle",
                " The parallelogram"
            ],
            "Trueanswer": [
                " The ellipse"
            ],
            "image": [
                "image2.jgeg"
            ]
        },
        {
            "Question": " .......Often it contains comparison function such as less than or greater than.",
            "Answer": [
                " Process symbol",
                " Output symbol",
                " Stop symbol",
                " Decision symbol"
            ],
            "Trueanswer": [
                " Process symbol"
            ],
            "image": []
        },
        {
            "Question": " I saw that movie ............ I was a child.",
            "Answer": [
                " until",
                " when",
                " after",
                " before"
            ],
            "Trueanswer": [
                " when"
            ],
            "image": []
        },
        {
            "Question": " You don’t need ............... when you draw a rectangle",
            "Answer": [
                " shift ",
                " Alt",
                " Ctrl ",
                " all of them"
            ],
            "Trueanswer": [
                " all of them"
            ],
            "image": []
        },
        {
            "Question": " ...........about size of a small typewriter.",
            "Answer": [
                " handheld ",
                " notebook",
                " laptop",
                " subnotebook"
            ],
            "Trueanswer": [
                " notebook"
            ],
            "image": []
        },
        {
            "Question": " A .......... can fit into a jacket pocket.x",
            "Answer": [
                " handheld",
                " notebook",
                " laptop",
                " subnotebook"
            ],
            "Trueanswer": [
                " handheld"
            ],
            "image": []
        },
        {
            "Question": " What should he buy if he wants a computer for writing letter and to keep staff records and to keep a diary of appointments.",
            "Answer": [
                " A minicomputer",
                " A PC",
                " A mainframe",
                "D  supercomputer"
            ],
            "Trueanswer": [
                " A PC"
            ],
            "image": [
                "image3.jgeg"
            ]
        }
        ]
print(json.dumps(exam))