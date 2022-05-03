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

function collectNeighborForm() {
  return {
    universityId: Number(document.getElementById("universityId").value),
    faculty: document.getElementById("faculty").value,
    preferredPrice: Number(document.getElementById("preferredPrice").value),
    preferredPeopleNum: Number(document.getElementById("preferredPeopleNum").value),
    preferredArea: document.getElementById("preferredArea").value,
    requirementsForNeighbour: document.getElementById("requirementsForNeighbour").value,
    aboutMyself: document.getElementById("aboutMyself").value,
    preferredGenders: getSelectedValues(document.getElementById("preferredGenders"))
  };
}

async function postNeighbourForm(event) {
  event.preventDefault();

  let neighbourForm = collectNeighborForm();
  let res = await fetch(baseUrl + "/user/neighbor-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(neighbourForm)
  });
  if (res.ok) {
    location.reload();
  } else {
    alert("Неверный запрос. Проверьте введенные данные");
  }
}

async function deleteNeighbourForm(){
  let res = await fetch(baseUrl + "/user/neighbor-form", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    location.reload();
  } else {
    alert("Анкета жильца не существует");
  }
}

async function fillNeighbourForm() {
  let res = await fetch(baseUrl + "/user/neighbor-form");
  if (res.ok) {
    let neighbourForm = (await res.json()).neighbourForm;

    document.getElementById("universityId").value = neighbourForm.universityId;
    document.getElementById("faculty").value = neighbourForm.faculty;
    document.getElementById("preferredPrice").value = neighbourForm.preferredPrice;
    document.getElementById("preferredPeopleNum").value = neighbourForm.preferredPeopleNum;
    document.getElementById("preferredArea").value = neighbourForm.preferredArea;
    document.getElementById("requirementsForNeighbour").value = neighbourForm.requirementsForNeighbour;
    document.getElementById("aboutMyself").value = neighbourForm.aboutMyself;

    let select = document.getElementById("preferredGenders");
    let preferredGenders = neighbourForm.preferredGenders;
    let genderIds = [];
    for (let i = 0; i < preferredGenders.length; i++) {
      let genderId = preferredGenders[i].genderId;
      genderIds.push(Number(genderId));
    }
    setSelectedValues(select, genderIds);
  }
  const form = document.getElementById("form-neighborForm");
  form.addEventListener("submit", postNeighbourForm);
  document.getElementById("button-delete").addEventListener("click", deleteNeighbourForm)
}

window.addEventListener("load", fillNeighbourForm);