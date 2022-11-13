const jwt = require("jsonwebtoken");
const { SmsAuthCheck } = require("../models");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).json({
        success: false,
        errorMessage: "로그인 후 사용하세요",
      });
    }

    const { phoneNumber } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    SmsAuthCheck.findOne({ where: { phoneNumber } }).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    res.status(401).send({
      success: false,
      errorMessage: "로그인 후 사용하세요",
    });
  }
};
