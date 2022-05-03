function collectAccountInfo() {
  return {
    name: document.getElementById("form-account_name").value,
    surname: document.getElementById("form-account_surname").value,
    genderId: Number(document.getElementById("form-account_genderId").value),
    contactEmail: document.getElementById("form-account_contactEmail").value,
    phone: document.getElementById("form-account_phone").value
  };
}

async function postAccount(event) {
  event.preventDefault();

  const account = collectAccountInfo();
  let res = await fetch(baseUrl + "/user/account", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account)
  });
  if (res.ok) {
    location.reload();
  } else {
    alert("Неверный запрос. Заполните все поля");
  }
}

async function fillAccount() {
  let res = await fetch(baseUrl + "/user/account");
  if (res.ok) {
    let account = (await res.json()).account;
    document.getElementById("form-account_name").value = account.name;
    document.getElementById("form-account_surname").value = account.surname;
    document.getElementById("form-account_genderId").value = account.genderId;
    document.getElementById("form-account_contactEmail").value = account.contactEmail;
    document.getElementById("form-account_phone").value = account.phone;
  } else {
    alert("Что-то пошло не так... Попробуйте через некоторое время снова");
  }

  const form = document.getElementById("form-account");
  form.addEventListener("submit", postAccount);
}

window.addEventListener("load", fillAccount);