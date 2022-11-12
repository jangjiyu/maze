const express = require("express");
const router = express.Router();
const { User, SmsAuthCheck } = require("../models");
const authMiddleware = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");
const geoip = require("geoip-lite");
const sendMessage = require("../utils/sendMessage");
const date = require("../utils/date");
const { Op } = require("sequelize");

// 로그인 [POST] /api/users/login
router.post("/", async (req, res) => {
  try {
    const {
      phoneNumber,
      authNumber,
      termsConditionsConsent,
      marketingConsent,
    } = req.body;
    const userIp = req.ip;
    const { country, region, city } = geoip.lookup(userIp);
    const location = `${country}/${region}/${city}`;
    const twoMinutesAgo = date.calculateTwoMinutesAgo();

    // 이용약관 미동의 시 에러메시지 반환
    if (!termsConditionsConsent) {
      res.status(400).json({
        success: false,
        errorMessage: "이용약관 동의 후 서비스 이용 가능합니다.",
      });
    }

    // 일치하는 정보 없을 시 에러메시지 반환
    const authNumberCheck = await SmsAuthCheck.findOne({
      where: {
        phoneNumber,
        authNumber,
        isAuthenticated: false,
        createdAt: { [Op.gt]: twoMinutesAgo },
      },
    });
    if (!authNumberCheck) {
      res.status(400).json({
        success: false,
        errorMessage: "핸드폰 번호 또는 인증 번호를 다시 확인해 주세요.",
      });
    }

    let userData = await User.findOne({ where: { phoneNumber } });
    let alertMessage = "재방문을 환영합니다!";
    // 유저 정보 없을 시 생성 후 SmsAuthCheck 테이블 isAuthenticated, location 컬럼 update -> login history로 이용
    if (!userData) {
      userData = await User.create({
        phoneNumber,
        termsConditionsConsent,
        marketingConsent,
      });
      await SmsAuthCheck.update(
        { isAuthenticated: true, location },
        { where: { phoneNumber, authNumber } }
      );
      alertMessage = "환영합니다! 가입이 완료되었습니다.";
    }
    await SmsAuthCheck.update(
      { isAuthenticated: true, location },
      { where: { phoneNumber, authNumber } }
    );

    const payload = { userId: userData.userId };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(201).json({ success: true, token, alertMessage });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      errorMessage: "올바르지 않는 요청입니다. 확인 후 다시 시도해 주세요.",
    });
  }
});

// 로그인 및 회원가입 인증번호 문자 전송 [POST] /api/users/sendAuthSms
router.post("/sendAuthSms", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // 6자리 인증번호
    const authNumber = Math.floor(100000 + Math.random() * 900000);

    // 2분 이내에 인증문자 보낸 이력 존재 && 미인증인 컬럼이 존재하는 경우 인증번호 update하고 재전송
    const twoMinutesAgo = date.calculateTwoMinutesAgo();
    const isExAuthNumber = await SmsAuthCheck.findOne({
      where: {
        phoneNumber,
        isAuthenticated: false,
        createdAt: { [Op.gt]: twoMinutesAgo },
      },
    });
    if (isExAuthNumber) {
      await SmsAuthCheck.update(
        { authNumber },
        {
          where: {
            phoneNumber,
            isAuthenticated: false,
            createdAt: { [Op.gt]: twoMinutesAgo },
          },
        }
      );
    }
    // 위의 경우가 아니면 새로운 인증정보 컬럼 create 후 전송
    await SmsAuthCheck.create({ phoneNumber, authNumber });

    sendMessage(phoneNumber, authNumber);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      errorMessage: "올바르지 않는 요청입니다. 확인 후 다시 시도해 주세요.",
    });
  }
});

// 로그인 이력 조회 [GET] /api/users/loginHistories
router.get("/loginHistories", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;

    const loginHistory = await SmsAuthCheck.findAll({
      where: { userId, isAuthenticated: true },
      attributes: ["location", "updatedAt"],
    });

    res.status(200).json({ success: true, loginHistory });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      errorMessage: "올바르지 않는 요청입니다. 확인 후 다시 시도해 주세요.",
    });
  }
});

module.exports = router;
