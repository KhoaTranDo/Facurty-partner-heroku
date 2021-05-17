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

const { DH_CHECK_P_NOT_PRIME } = require("constants");



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


router.get("/:id", ExamController.addExam);
router.get("/import", ExamController.importExam);  
router.post("/import",upload.single("avatar"), ExamController.readExam);
router.post("/import/mixquestion", ExamController.readmixExam);
router.get("/import/:slug", ExamController.importSlug);
router.put("/import/edit/:slug", ExamController.editexam);
router.put("/infor/:id/edit", ExamController.infor);
router.post("/scan", ExamController.getqr);

module.exports = router;