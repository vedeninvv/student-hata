var page = 1;

function addFlatHTMLToList(list, template, flatPost) {
  const newElem = template.content.cloneNode(true);
  list.appendChild(newElem);

  let elems = document.getElementsByClassName("flat-neighbors-list__elem");
  let elem = elems[elems.length - 1];
  let values = elem.getElementsByClassName("characteristic-list-line__value");

  values[0].innerText = flatPost.name + " " + flatPost.surname;
  values[1].innerText = flatPost.address;
  values[2].innerText = flatPost.price;
  values[3].innerText = flatPost.maxPeople;
  values[4].innerText = flatPost.description;
  values[5].innerText = flatPost.requirements;
  values[6].innerText = flatPost.preferredUniversities;
  values[7].innerText = flatPost.undesirableUniversities;
}

async function addFlatPostsPack() {
  deleteButtonNext();

  const list = document.getElementsByClassName("flat-neighbors-list")[0];
  const template = document.getElementById("template-flatPost");
  const elemsPerPage = 3;

  let urlRange = "/flats?start=" + elemsPerPage * (page - 1) + "&end=" + elemsPerPage * page;
  let res = await fetch(baseUrl + urlRange);
  if (res.ok) {
    let flats = (await res.json()).flats;
    for (let i = 0; i < flats.length; i++) {
      addFlatHTMLToList(list, template, flats[i]);
    }
    if (flats.length === elemsPerPage) {
      page++;
      createButtonNext();
    }
    return flats.length;
  } else {
    alert("Что-то пошло не так. Попробуйте позже");
  }
}

function createButtonNext() {
  const main = document.getElementsByTagName("main")[0];

  let template = document.getElementById("temp-button-next");
  let button = template.content.cloneNode(true);
  main.appendChild(button);
  button = document.getElementById("button-next");
  button.addEventListener("click", addFlatPostsPack);
  return button;
}

function deleteButtonNext() {
  let button = document.getElementById("button-next");
  if (button) {
    button.remove();
  }
}

async function init() {
  await addFlatPostsPack();
}

window.addEventListener("load", init);