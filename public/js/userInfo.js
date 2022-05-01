async function userInfo() {
  let res = await fetch(baseUrl + "/user/account");
  if (res.ok) {
    let account = (await res.json()).account;
    let accountHTML = document.getElementById("account-name");
    accountHTML.getElementsByTagName("a")[0].innerText = account.name;
    accountHTML.style.display = "list-item";
  } else {
    document.getElementById("login").style.display = "list-item";
    document.getElementById("registration").style.display = "list-item";
  }
}

window.addEventListener('load', userInfo);