const schedule = require("node-schedule");
const { SmsAuthCheck } = require("../models");
const { Op } = require("sequelize");
const date = require("./date");

const SmsAuthCheckTableScheduler = async () => {
  try {
    // 매일 자정에 sms 인증 data 삭제 스케쥴 실행
    schedule.scheduleJob("0 0 * * *", async () => {
      const twoMinutesAgo = date.calculateTwoMinutesAgo();

      await SmsAuthCheck.destroy({
        where: {
          isAuthenticated: false,
          createdAt: { [Op.lte]: twoMinutesAgo },
        },
      });
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = SmsAuthCheckTableScheduler;
