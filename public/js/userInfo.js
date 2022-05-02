async function logout() {
  await fetch(baseUrl + "/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  location.reload();
}

async function userInfo() {
  let res = await fetch(baseUrl + "/user/account");
  if (res.ok) {
    let account = (await res.json()).account;
    let accountHTML = document.getElementById("account-name");
    accountHTML.getElementsByTagName("a")[0].innerText = account.name;
    accountHTML.style.display = "list-item";
    let logoutHTML = document.getElementById("logout");
    logoutHTML.style.display = "list-item";
    logoutHTML.addEventListener("click", logout);
  } else {
    document.getElementById("login").style.display = "list-item";
    document.getElementById("registration").style.display = "list-item";
  }
}

supertokens.init({
  apiDomain: baseUrl
});

window.addEventListener("load", userInfo);