const axios = require("axios");
const CryptoJS = require("crypto-js");

const sendMessage = async (phoneNumber, authNumber) => {
  try {
    const date = Date.now().toString();
    const uri = process.env.SMS_SERVICE_ID; // Service ID
    const secretKey = process.env.SMS_SECRET_KEY; // Secret Key
    const accessKey = process.env.SMS_ACCESS_KEY; // Access Key
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    await axios({
      method: method,
      url: url,
      headers: {
        "Contenc-type": "application/json; charset=utf-8",
        "x-ncp-iam-access-key": accessKey,
        "x-ncp-apigw-timestamp": date,
        "x-ncp-apigw-signature-v2": signature,
      },
      data: {
        type: "SMS",
        countryCode: "82",
        from: process.env.SMS_MYNUM, //발신번호
        content: `[메이즈 백엔드 채용] 인증번호 [${authNumber}]를 입력해주세요.`, // 문자 내용
        messages: [{ to: `${phoneNumber}` }], // 수신번호
      },
    });

    return { status: 200 };
  } catch (error) {
    console.error("문자발송 에러: ", error.response.status);
    return { status: 401 };
  }
};

module.exports = sendMessage;
