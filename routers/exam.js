const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const multer = require("multer");
var passport = require('passport')
const User = require("../models/account");
const ExamController = require("../controllers/exam");

const uuid = require("uuid").v4;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
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
router.get("/", ExamController.index);
module.exports = router;