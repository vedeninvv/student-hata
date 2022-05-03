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

async function postFlatPost(event) {
  event.preventDefault();

  let flatPost = collectFlatPost();

  let res = await fetch(baseUrl + "/flats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flatPost)
  });
  if (res.ok) {
    location.reload();
  } else {
    alert("Неверный запрос. Проверьте введенные данные");
  }
}

function init() {
  const form = document.getElementById("form-flatPost");
  form.addEventListener("submit", postFlatPost);
}

window.addEventListener("load", init);