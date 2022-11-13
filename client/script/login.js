// 인증번호 문자 전송
const btnSendMessage = document.querySelector("#sendMessage");

btnSendMessage.addEventListener("click", sendMessage);

async function sendMessage(event) {
  const phoneNumber = document.querySelector("#phoneNumber").value;

  const sendMessageReturn = await axios({
    method: "post",
    url: "http://localhost:3001/api/users/sendAuthSms",
    headers: {},
    data: {
      phoneNumber,
    },
  });

  const isValidSendMessage = sendMessageReturn.data.success == true;
  if (!isValidSendMessage) {
    return alert("인증번호 전송에 실패하였습니다. 확인 후 다시 시도해 주세요.");
  }
  return alert("인증번호 전송에 성공하였습니다. 문자 메시지를 확인해 주세요.");
}

// 회원가입 및 로그인
const btnLogin = document.querySelector("#login");
const termsConditions = document.getElementById("termsConditionsConsent");
const marketing = document.getElementById("marketingConsent");

btnLogin.addEventListener("click", login);
async function login(event) {
  const phoneNumber = document.querySelector("#phoneNumber").value;
  const authNumber = document.querySelector("#authNumber").value;

  const termsConditionsConsentResult = termsConditions.checked;
  const marketingConsentResult = marketing.checked;

  const loginReturn = await axios({
    method: "post",
    url: "http://localhost:3001/api/users/login",
    headers: {},
    data: {
      phoneNumber,
      authNumber,
      termsConditionsConsent: termsConditionsConsentResult,
      marketingConsent: marketingConsentResult,
    },
  });

  const isValidLogin = loginReturn.data.success == true;
  if (!isValidLogin) {
    return alert(
      "로그인 정보가 올바르지 않습니다. 확인 후 다시 시도해 주세요."
    );
  }

  const token = loginReturn.data.token;
  localStorage.setItem("x-access-token", token);
  alert(loginReturn.data.alertMessage);
  return location.replace("./loginHistory.html");
}
