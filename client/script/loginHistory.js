// 로컬스토리지에서 x-access-token 확인
const token = localStorage.getItem("x-access-token");

const btnShowLoginHistory = document.querySelector("#showLoginHistory");
const loginHistoryList = document.querySelector("#loginHistory");

btnShowLoginHistory.addEventListener("click", showLoginHistory);

async function showLoginHistory(event) {
  const loginHistoryReturn = await axios({
    method: "get",
    url: "http://apryll.shop/api/users/loginHistories",
    headers: { "x-access-token": token },
    data: {},
  });

  const isValidLoginHistory = loginHistoryReturn.data.success == true;
  if (!isValidLoginHistory) {
    return alert(
      "예기치 못한 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요."
    );
  }

  const rows = loginHistoryReturn.data.loginHistory;

  for (let i = 0; i < rows.length; i++) {
    let time = rows[i]["updatedAt"];
    console.log(time);

    let tempHtml = `<tr>
                      <td>${time}</td>
                    </tr>`;

    loginHistoryList.insertAdjacentHTML("afterbegin", tempHtml);
  }
}
