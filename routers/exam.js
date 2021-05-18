const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const multer = require("multer");
var passport = require('passport')
const User = require("../models/account");
const ExamController = require("../controllers/exam");
const path =require('path')
const uuid = require("uuid").v4;
var AWS = require("aws-sdk");
var multerS3 = require('multer-s3')

AWS.config.update({
  accessKeyId: process.env.AWS_SECRET_KEY||"AKIAYF3ZOGVKOQW5CUAA",
  secretAccessKey: process.env.AWS_ACCESS_KEY||"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",
  region:"ap-southeast-1"
})
var app = express(),
s3 = new AWS.S3();

var upload3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'farcurtypartner',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.originalname});
    },
    key: (req, file, cb) => {
      const { originalname } = file;
      const uniquename=`${uuid()}-${originalname}`
      cb(null, uniquename);
    },
  })
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), './public/'));
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    const uniquename=`${uuid()}-${originalname}`
    cb(null, uniquename);
  },
  
});
const upload = multer({ storage });


router.post("/import/mixquestion", ExamController.readmixExam);
router.get("/import/:slug", ExamController.importSlug);
router.put("/import/edit/:slug", ExamController.editexam);
router.put("/infor/:id/edit", ExamController.infor);
router.get("/import", ExamController.importExam);  
router.post("/import",upload3.single("avatar"), ExamController.readExam);
router.post("/scan", ExamController.getqr);
router.get("/:id", ExamController.addExam);

module.exports = router;