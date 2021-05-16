const multer = require("multer");
const accountRouter = require("./account");
const ExamRouter = require("./exam");
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

function route(app) {
  // Chứa các router chính
  // app.use("/account",accountRouter: nhánh con bên trong)
  app.get("/ada", (req, res) => {
    res.send("Hello World!");
  });
  app.use("/account",accountRouter);
  app.use("/exam",ExamRouter);

  // upload.single('avatar') avatar la key cua file
  app.post("/upload/demo", upload.single("avatar"), (req, res) => {
    console.log(req.file.filename)
    return res.json("OK");
  });
}

module.exports = route;
