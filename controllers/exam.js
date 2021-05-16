const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { validationResult, check } = require("express-validator");
const Examschema = require("../models/ExamModel");
const config = require("config");
const spawn = require("child_process").spawn;
const qr = require("qrcode");
const lodash = require("lodash");
const fs = require("fs");
const { parseInt } = require("lodash");

// Call model
// const Role = require('../models/Role')
/**
 * Role.findOne({ slug: req.params.slug })
            .then(roles => res.render('lessor/show', { roles: mongooseToObject(roles) }))
            .catch(next)
 * Find
 * Findone
 * save
 * findByid
 * Put
 * Updatemany
 *  Role.updateMany({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/lessor/stores/post'))
            .catch(next)
  DeleteOne
*/
class Exam {
  async addExam(req, res) {
    console.log("aaaaa");
    let id = req.params.id;
    // res.json({ id: req.params.id });
    // let a =  Examschema.findOne({ slug: req.params.id });
    // console.log(a.data);
    try {
       await Examschema.findOne({ slug: id }, (err, result) => {
        if (err) console.log(err);
        res.json(result);
      }).select("-password"); //khong hien thi password
    } catch (err) {
      res.json({
        result: false,
        message: err,
      });
    }
  }
  index(req, res) {
    res.json({ ad: "ddd" });
  }
  importExam(req, res) {
    res.json({ ad: "import" });
  }
  readExam = (req, res) => {
    // Thư viện spawn để chạy python
    var spawn = require("child_process").spawn;
    // Get questions data from python
    let getRawanswer = "";
    // Exam object
    var exam = {};
    // Lấy ảnh đã mã hoá
    const url = req.file.filename;
    // Kiểm tra qr rỗng không
    if (url.length === 0) res.send("Empty Data!");
    // Xuất qr code
    qr.toDataURL(url, (err, src) => {
      if (err) res.send("Error occured");
      exam["qrimage"] = src;
    });
    // Lấy file name
    //var tenfile = "de3.docx"; //vd de3.docx
    var tenfile = req.file.filename;
    //Truyen file vao python để dọc
    var process = spawn("python", ["Readword.py", tenfile]);

    //Tạo slug phần biệt
    exam["slug"] = req.file.filename;
    console.log(exam['slug'])
    // Chạy python
    process.stdout
      .on("data", function (data) {
        getRawanswer += data.toString();
      })
      .on("end", () => {
        exam["rawquestion"] = JSON.parse(getRawanswer);

        res.send(exam);
      });
    process.stderr.on("data", function (data) {
      console.log("err data: " + data);
    });
    setTimeout(function () {
       // Xoa file docx da up len
    const path = `./public/${req.file.filename}`;

    fs.unlink(path, (err) => {
      if (err) {
        console.log("khong co file");
        //console.error(err);
        return;
      }
      //file removed
    });
    }, 10000);
  };
  async readmixExam(req, res) {
    let {
      data,
      quanlityExam,
      title,
      timedoexam,
      mixanswer,
      mixquestion,
      quanlityQs,
      password,
      
    } = req.body;
    var arrmixexam = [];

    // // Xoa file docx da up len
    // const path = `./public/${data["slug"]}`;

    // fs.unlink(path, (err) => {
    //   if (err) {
    //     console.log("khong co file");
    //     //console.error(err);
    //     return;
    //   }
    //   //file removed
    // });
    let data1 = data;
    let data2 = data;
    data1["rawquestion"] = data["rawquestion"];

    arrmixexam = Letmixquestion(
      data2,
      quanlityExam,
      mixquestion,
      mixanswer,
      quanlityQs
    );
    // Ma hoa password
    const salt = await bcryptjs.genSalt(10);
    password = await bcryptjs.hash(password, salt);
    // so sanh pass word
    // let isPasswordMatch = await bcryptjs.compare(password, user.password);
    data1["exammixed"] = arrmixexam;
    //console.log(data1['exammixed'])
    // console.log(arrmixexam)
    data1["qrimage"]=data["qrimage"]
    data1["title"] = title;
    data1["time"] = timedoexam;
    try {
      let titles = title;
      let rawquestions = data1["rawquestion"];
      let optionmixed = [mixanswer.toString(), mixquestion.toString()];
      let exammixed = lodash.values(data1["exammixed"]);
      let slug = data1["slug"];
      let qrimage=data1['qrimage']
      let dataexam = new Examschema({
        titles,
        password,
        timedoexam,
        rawquestions,
        optionmixed,
        exammixed,
        slug,
        qrimage
      });
      let examcheck = await Examschema.findOne({ slug: slug });
      if (examcheck) {
        Examschema.updateOne(
          { slug: slug },
          {
            slug: slug,
            titles: titles,
            password: password,
            rawquestions: rawquestions,
            timedoexam: timedoexam,
            optionmixed: optionmixed,
            exammixed: exammixed,
            qrimage:qrimage
          },
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          }
        );
      } else {
        dataexam.save().then(() => {
          console.log("sucess");
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error..." });
    }
    res.send(data1);
  }
  // Get base64 image code
  getqr(req, res) {
    const url = req.body.url;
    if (url.length === 0) res.send("Empty Data!");
    qr.toDataURL(url, (err, src) => {
      if (err) res.send("Error occured");
      res.send(JSON.stringify(src));
    });
  }
  importSlug(req, res) {
    res.json({ addd: "importSlug" });
  }
  editexam(req, res) {
    res.json({ addd: "editexam" });
  }
  infor(req, res) {
    res.json({ addd: "infor" });
  }
}
function Letmixquestion(datasourse, sode, checkQs, checkAs, quanlityQs) {
  let exam = lodash.cloneDeep(datasourse);
  var data = {};
  data[sode];
  if (checkQs === true) {
    if (checkAs) {
      for (var i = 0; i < sode; i++) {
        var data1 = {};
        var arr = lodash.shuffle(exam["rawquestion"]);
        arr.map((value) => {
          let Answerch = lodash.shuffle(value["Answer"]);
          value["Answer"] = Answerch;
        });

        data1["idexam"] =
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1);
        data1["questions"] = arr.slice(0, parseInt(quanlityQs)); //lodash.sampleSize(arr, parseInt(quanlityQs));
        data[i] = data1;
      }
    } else {
      for (var i = 0; i < sode; i++) {
        var data1 = {};
        var arr = lodash.shuffle(exam["rawquestion"]);
        data1["idexam"] =
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1);
        data1["questions"] = arr.slice(0, parseInt(quanlityQs)); //lodash.sampleSize(arr, parseInt(quanlityQs));
        data[i] = data1;
      }
    }
  } else {
    if (checkAs) {
      let arr = exam["rawquestion"];
      for (var i = 0; i < sode; i++) {
        var data1 = {};
        arr.map((value) => {
          let Answerch = lodash.shuffle(value["Answer"]);
          value["Answer"] = Answerch;
        });
        data1["idexam"] =
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1);
        data1["questions"] = arr.slice(0, parseInt(quanlityQs));
        data[i] = data1;
      }
    } else {
      for (var i = 0; i < sode; i++) {
        var data1 = {};
        var arr = exam["rawquestion"];
        data1["idexam"] =
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1);
        data1["questions"] = arr.slice(0, parseInt(quanlityQs));
        data[i] = data1;
      }
    }
  }

  return data;
}
// }
module.exports = new Exam();
/**
 * 
mangnhan=_.shuffle(datashow['rawquestion'])
console.log(mangnhan)

mangnhan.map((value)=>{
  let Answerch=_.shuffle(value['Answer'])
//  console.log(Answerch)
  value['Answer']=Answerch
})

//console.log(mangnhan)

let a=[1,2,3,4,5]

console.log(_.sampleSize(a, 4))
 */
