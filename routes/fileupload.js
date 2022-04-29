const multer = require("multer"); // 파일 업로드를 위해 multer 패키지를 불러온다.
const moment = require("moment"); // 파일명에 현재 시간을 할당하기 위해, 시간 정보를 불러오는 moment 패키지를 불러옵니다.

const storage = multer.diskStorage({
  //multer 패키지의 diskStorage함수를 실행합니다.
  destination: function (req, file, cb) {
    // 파일 저장 경로를 지정하기 위해 destination 함수를 실행합니다.
    // 이 때, 파라미터로 react서버에서 전달받은 request와 file 정보를 받습니다.
    // request에는 텍스트 변수들이, file 에는 업로드한 정보가 들어있습니다.
    // cb함수는 multer 내부적으로 사용되는 함수이니, 정해진 규칙처럼 사용하시면 된다.
    try {
      var type = req.query.type; // react 에서 전달받은 type 파라미터를, 내부변수 type에 할당한다.
      cb(null, type); // type 에는 폴더 상대경로를 넣었는데, cb 함수의 두번째 파라미터로 경로값을 넣는다.
    } catch (error) {
      console.log(error);
    }
  },
  filename: function (req, file, cb) {
    // 저장될 파일명을 지정하기 위해 filename 함수를 실행한다.
    // 이때 파라미터로 react 서버에서 전달받은 request 와 file 정보를 받는다.
    cb(null, moment().format("YYYYMMDDHHmmss") + "_" + file.originalname);
    // moment 함수로 현재시간을 연부터 초까지 추출해, 원본파일명 앞에 붙여준다.
  },
});

const upload = multer({ storage: storage }).single("file");
// line4에서 diskStorage함수의 결과로 저장된 storage 변수를, multer 의 내부 storage 변수에 저장한다.
// 파일이 하나이니 single('file') 함수도 붙여준다.
module.exports = upload;
