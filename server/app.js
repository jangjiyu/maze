const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./models");
const cors = require("cors");
const router = require("./routes");
const SmsAuthCheckTableScheduler = require("./utils/setSchedule");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// sequelize 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error("데이터베이스 연결 실패 - ", err);
  });

// 미사용 문자 인증 번호 DATA 삭제
SmsAuthCheckTableScheduler();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static("/home/ubuntu/maze/client"));
app.use("/api", router);

// 에러 핸들러
app.use((err, req, res, next) => {
  console.log("[", err.name, "] -", err.message);
  res.status(err.status || 500).json({
    success: false,
    errorMessage: err.message,
  });
});

app.listen(port, () => {
  console.log(
    `🟢 ${port} 포트로 서버가 열렸어요! http://localhost:${port}/api`
  );
});
