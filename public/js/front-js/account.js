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

function addDeleteButton(list, id) {
  let button = document.createElement("button");
  button.id = id;
  button.innerText = "УДАЛИТЬ";
  button.classList.add("btn-save");
  button.addEventListener("click", async function() {
    let res = await fetch(baseUrl + "/flats/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      location.reload();
    } else {
      alert("Данной квартиры не существует");
    }
  });
  list.appendChild(button);
}

function addDetailsButton(list, id) {
  let button = document.createElement("button");
  button.id = id;
  button.innerText = "подробнее";
  button.classList.add("btn-details");

  let a = document.createElement("a");
  a.appendChild(button);
  a.href = "/flats/show-flat/" + id;

  list.appendChild(a);
}

function addFlatHTMLToList(list, template, flatPost) {
  const newElem = template.content.cloneNode(true);
  list.appendChild(newElem);

  let elems = document.getElementsByClassName("flat-neighbors-list__elem");
  let elem = elems[elems.length - 1];
  let values = elem.getElementsByClassName("characteristic-list-line__value");

  values[0].innerText = flatPost.address;
  values[1].innerText = flatPost.price;
  values[2].innerText = flatPost.maxPeople;
  values[3].innerText = flatPost.description;
  values[4].innerText = flatPost.requirements;
}

async function allUserFlatPosts() {
  const list = document.getElementsByClassName("flat-neighbors-list")[0];
  const template = document.getElementById("template-flatPost");

  let res = await fetch(baseUrl + "/flats/user-flats");
  if (res.ok) {
    let flatPosts = (await res.json()).flatPosts;
    for (let i = 0; i < flatPosts.length; i++) {
      addFlatHTMLToList(list, template, flatPosts[i]);
      addDeleteButton(list, flatPosts[i].id);
      addDetailsButton(list, flatPosts[i].id);
    }
  } else {
    alert("Что-то пошло не так... Попробуйте позже");
  }

}

window.addEventListener("load", fillAccount);
window.addEventListener("load", allUserFlatPosts);