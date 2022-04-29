var express = require("express");
var router = express.Router();
var upload = require("./fileupload");
var multer = require("multer");

router.post("/", (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return next(err);
    }
    console.log("원본 파일명 : " + req.file.originalname); // originalname : 사용자가 업로드한 파일명
    console.log("저장 파일명 : " + req.file.filename); // filename : fileupload 모듈에서 생성한 업로드 파일명
    console.log("크기 : " + req.file.size);
    return res.json({ filename: req.file.filename });
  });
});

module.exports = router;
