function getSelectedValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i = 0, iLen = options.length; i < iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(Number(opt.value));
    }
  }
  return result;
}

function setSelectedValues(select, values) {
  let options = select && select.options;

  for (var i = 0, iLen = options.length; i < iLen; i++) {
    let opt = options[i];
    if (values.indexOf(Number(opt.value)) !== -1) {
      opt.selected = true;
    }
  }
}

function collectFlatPost() {
  return {
    address: document.getElementById("address").value,
    price: Number(document.getElementById("price").value),
    maxPeople: Number(document.getElementById("maxPeople").value),
    description: document.getElementById("description").value,
    requirements: document.getElementById("requirements").value,
    preferredUniversityIds: getSelectedValues(document.getElementById("preferredUniversityIds")),
    undesirableUniversityIds: getSelectedValues(document.getElementById("undesirableUniversityIds"))
  };
}

async function putFlatPost(event) {
  event.preventDefault();

  let flatPost = collectFlatPost();

  let res = await fetch(baseUrl + "/flats/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flatPost)
  });
  if (res.ok) {
    location.href = baseUrl + "/user/show-account";
  } else {
    alert("Неверный запрос. Проверьте введенные данные");
  }
}

async function fillFlatPost() {
  let res = await fetch(baseUrl + "/flats/" + id);
  if (res.ok) {
    let flatPost = (await res.json()).flatPost;

    let preferredUniversitiesIds = [];
    for (let i = 0; i < flatPost.preferredUniversities.length; i++) {
      preferredUniversitiesIds.push(flatPost.preferredUniversities[i].universityId);
    }

    let undesirableUniversitiesIds = [];
    for (let i = 0; i < flatPost.undesirableUniversities.length; i++) {
      undesirableUniversitiesIds.push(flatPost.undesirableUniversities[i].universityId);
    }

    document.getElementById("address").value = flatPost.address;
    document.getElementById("price").value = flatPost.price;
    document.getElementById("maxPeople").value = flatPost.maxPeople;
    document.getElementById("description").value = flatPost.description;
    document.getElementById("requirements").value = flatPost.requirements;
    setSelectedValues(document.getElementById("preferredUniversityIds"), preferredUniversitiesIds);
    setSelectedValues(document.getElementById("undesirableUniversityIds"), undesirableUniversitiesIds);
  } else {
    alert("Нет доступа к данному посту");
  }
}

function init() {
  fillFlatPost()
  const form = document.getElementById("form-flatPost");
  form.addEventListener("submit", putFlatPost);
}

var urlArray = document.location.href.split("/");
var id = urlArray[urlArray.length - 1];

window.addEventListener("load", init);