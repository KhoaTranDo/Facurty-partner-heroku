require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { validationResult, check } = require("express-validator");
const Examschema = require("../models/ExamModel");
const config = require("config");
const spawn = require("child_process").spawn;
const qr = require("qrcode");
const lodash = require("lodash");

const { parseInt } = require("lodash");
const cloudinary = require("cloudinary");
var AWS = require("aws-sdk");

cloudinary.config({
  cloud_name: "caps2",
  api_key: "293927814639645",
  api_secret: "NhSFfU7fcQWrUZoK_JBpssz0Ny8",
});

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

    // Get questions data from python
    let getRawanswer = "";
    // Exam object
    var exam = {};
    // Lấy ảnh đã mã hoá
    const url = req.file.key;
    // Kiểm tra qr rỗng không
    if (url.length === 0) res.send("Empty Data!");
    // Xuất qr code
    qr.toDataURL(url, (err, src) => {
      if (err) res.send("Error occured");
      exam["qrimage"] = src;
    });
    // Lấy file name
    //var tenfile = "de3.docx"; //vd de3.docx
    var tenfile = req.file.key;
    //Truyen file vao python để dọc
    var process = spawn("python", ["Readword.py", tenfile]);

    //Tạo slug phần biệt
    exam["slug"] = req.file.key;

    // Chạy python
    try {
      process.stdout
        .on("data", function (data) {
          getRawanswer += data.toString();
        })
        .on("end", () => {
          if (!getRawanswer) {
            return res.status("import file error");
          } else {
            exam["rawquestions"] = JSON.parse(getRawanswer);
            return res.send(exam);
          }
        });
      process.stderr.on("data", function (data) {
        return res.status(404).json(data.toString("utf-8"));
      });
    } catch (error) {
      return res.status(500).json(error);
    }
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
    data1["rawquestions"] = data["rawquestions"];

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

    data1["qrimage"] = data["qrimage"];
    data1["title"] = title;
    data1["time"] = timedoexam;
    try {
      let titles = title;
      let rawquestions = data1["rawquestions"];
      let optionmixed = [mixanswer.toString(), mixquestion.toString()];
      let exammixed = lodash.values(data1["exammixed"]);
      let slug = data1["slug"];
      let qrimage = data1["qrimage"];
      let dataexam = new Examschema({
        titles,
        password,
        timedoexam,
        rawquestions,
        optionmixed,
        exammixed,
        slug,
        qrimage,
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
            qrimage: qrimage,
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
        dataexam.save().then((result) => {
          return res.status(200).json({ data: result, msg: "sucess" });
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Server Error..." });
    }
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
  // Quet qr để mở bài kiểm tra
  gradingexam(req, res) {
    let { idexam, password } = req.body;
    Examschema.findOne({ slug: idexam }, function (err, result) {
      if (err) return handleError(err);
      if (result) {
        bcryptjs.compare(password, result.password, function (err, res1) {
          if (err) {
            console.log(err);
          }
          if (res1) {
            // Send JWT
            console.log(res1);
            res.send({ data: result });
          } else {
            // response is OutgoingMessage object that server response http request
            // return response.json({success: false, message: 'passwords do not match'});
            res.send({ error: "not match" });
          }
        });
      } else {
        res.send({ error: "Khong co data" });
      }
    });
  }
  async gradingtest(req, res) {
    let { file, idexam, slug, nameStudent } = req.body;
    var uploadStr = file["base64"];
    let url = "";
    let dataraw={}
    await cloudinary.v2.uploader.upload(
      uploadStr,
      {
        overwrite: true,
        invalidate: true,
      },
      function (error, result) {
        url = result.url;
        console.log(result.url);
      }
    );
    let imagesend = JSON.stringify({ image: file["base64"] });
    try {
      Examschema.findOne({ slug: slug }).then(async (result) => {
        if (result) {
          let data = result.exammixed.find(
            (x) => x.idexam.toString() === idexam
          );
          var process = await spawn("python", [
            "gradingexam.py",
            data["listanswer"],
            url,
            nameStudent,
            data["listanswer"].length,
          ]);
          process.stdout.on("data", function (data) {
             dataraw=data.toString()   
          })
          .on("end", () => {
            if (!dataraw) {
              console.log('aa')
              return res.status("import file error");
            } else {
              console.log('bbb')
              console.log(dataraw)
              return res.status(200).send(dataraw); 
            }
          });
          process.stderr.on("data", function (data) {
            let dataresult=dataraw
            console.log(dataresult)
            return res.status(404).json(data.toString("utf-8"));
          });
        } else {
          res.json({ error: "No have any data" });
        }
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  saveResult(req, res) {
    let{nameStudent,image,idexam,slug,scope}=req.body
    let dataGrading={
      "nameStudent":nameStudent,
      "truequestion":scope,
      "image":image
    }
    let save=[]
    try {
      Examschema.findOne({ slug: slug }).then(async (result) => {
        if (result) {
          let data = result.exammixed.find(
            (x) => x.idexam.toString() === idexam
          );
          save=data.grading
          save.push(dataGrading)
          data.grading=save
          Examschema.updateOne(
            { slug: slug },
            {
              exammixed: result.exammixed,    
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
          res.json({ error: "No have any data" });
        }
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  // Tìm bộ bài kiểm tra
  importSlug(req, res) {
    try {
      Examschema.findOne({ slug: req.params.slug }).then((result) => {
        if (result) res.json(result);
        else {
          res.json({ error: "No have any data" });
        }
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  // cap nhat chinh sua bai kiem tra
  async editexam(req, res) {
    let id = req.params.slug;
    let mixquestion, mixanswer;
    let idexam = req.body.idexam;
    // res.json({ id: req.params.id });
    try {
      await Examschema.findOne({ slug: id }, (err, result) => {
        if (err) console.log(err);
        let data = result;
        mixanswer = data["optionmixed"][0];
        mixquestion = data["optionmixed"][1];
        if (data["exammixed"].findIndex((x) => x.idexam === idexam) < 0) {
          console.log("khong co");
        } else {
          let index = data["exammixed"].findIndex((x) => x.idexam === idexam);
          let lengthqs = data["exammixed"][index].questions.length;
          let newdata = Letmixquestion(
            data,
            1,
            mixquestion,
            mixanswer,
            lengthqs
          );

          data["exammixed"][index] = newdata[0];

          Examschema.updateOne(
            { slug: id },
            {
              exammixed: data["exammixed"],
            },
            function (err, result) {
              if (err) {
                console.log(err);
              } else {
                res.send(data);
              }
            }
          ).select("-password");
        }
      });
    } catch (err) {
      res.json({
        result: false,
        message: err,
      });
    }
  }
}

// Xu ly tron de kiem tra
function Letmixquestion(datasourse, sode, checkQs, checkAs, quanlityQs) {
  let exam = lodash.cloneDeep(datasourse);
  var data = {};
  data[sode];
  if (checkQs === true) {
    if (checkAs) {
      for (var i = 0; i < sode; i++) {
        var data1 = {};
        var arr = lodash.shuffle(exam["rawquestions"]);
        arr.map((value) => {
          let Answerch = lodash.shuffle(value["Answer"]);
          value["Answer"] = Answerch;
        });
        data1["idexam"] =
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1) +
          100;
        data1["questions"] = arr.slice(0, parseInt(quanlityQs)); //lodash.sampleSize(arr, parseInt(quanlityQs));
        let listarray = [];
        data1["questions"].map((value, index) => {
          if (value.Trueanswer.length > 0) {
            value.Answer.map((ans1, index1) => {
              if (value.Answer[index1] === value.Trueanswer[0]) {
                listarray.push(index1);
              }
            });
          } else {
            listarray.push("N/A");
          }
          data1["listanswer"] = listarray;
          data1["grading"] = [];
        });

        data[i] = data1;
      }
    } else {
      for (var i = 0; i < sode; i++) {
        var data1 = {};
        var arr = lodash.shuffle(exam["rawquestions"]);
        data1["idexam"] =
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1) +
          100;
        data1["questions"] = arr.slice(0, parseInt(quanlityQs)); //lodash.sampleSize(arr, parseInt(quanlityQs));
        let listarray = [];
        data1["questions"].map((value, index) => {
          if (value.Trueanswer.length > 0) {
            value.Answer.map((ans1, index1) => {
              if (value.Answer[index1] === value.Trueanswer[0]) {
                listarray.push(index1);
              }
            });
          } else {
            console.log(value.Trueanswer);
            listarray.push("N/A");
          }
          data1["listanswer"] = listarray;
          data1["grading"] = [];
        });

        data[i] = data1;
      }
    }
  } else {
    if (checkAs) {
      let arr = exam["rawquestions"];
      for (var i = 0; i < sode; i++) {
        var data1 = {};
        arr.map((value) => {
          let Answerch = lodash.shuffle(value["Answer"]);
          value["Answer"] = Answerch;
        });
        data1["idexam"] =
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1) +
          100;
        data1["questions"] = arr.slice(0, parseInt(quanlityQs));
        let listarray = [];
        data1["questions"].map((value, index) => {
          if (value.Trueanswer.length > 0) {
            value.Answer.map((ans1, index1) => {
              if (value.Answer[index1] === value.Trueanswer[0]) {
                listarray.push(index1);
              }
            });
          } else {
            console.log(value.Trueanswer);
            listarray.push("N/A");
          }
          data1["listanswer"] = listarray;
          data1["grading"] = [];
        });

        data[i] = data1;
      }
    } else {
      for (var i = 0; i < sode; i++) {
        var data1 = {};
        var arr = exam["rawquestions"];
        data1["idexam"] =
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 100 + 1) +
          100;
        data1["questions"] = arr.slice(0, parseInt(quanlityQs));
        let listarray = [];
        data1["questions"].map((value, index) => {
          if (value.Trueanswer.length > 0) {
            value.Answer.map((ans1, index1) => {
              if (value.Answer[index1] === value.Trueanswer[0]) {
                listarray.push(index1);
              }
            });
          } else {
            console.log(value.Trueanswer);
            listarray.push("N/A");
          }
          data1["listanswer"] = listarray;
          data1["grading"] = [];
        });

        data[i] = data1;
      }
    }
  }
  return data;
}
// }

module.exports = new Exam();
