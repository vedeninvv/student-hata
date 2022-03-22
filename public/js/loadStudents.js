window.onload = loadStudents;

function loadStudents() {
    let start = getRandomInt(1, 5);
    let end = getRandomInt(start + 1, 8);

    appendWaitingGif()

    let response = fetch('https://jsonplaceholder.typicode.com/users/');
    response.then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error("Error");
        }
    }).then((users) => {
        removeWaitingGif()
        let neighborList = document.getElementsByClassName("flat-neighbors-list")[0];

        for (let id = start; id < end; id++) {
            let neighbor = createNeighborHtml(users[id]);
            neighborList.appendChild(neighbor);
        }
    }).catch((error) => {
        printError()
    });
}

function createNeighborHtml(neighbor) {
    let neighborTemp = document.getElementById("neighbors-list-elem-template");
    let neighborHtml = neighborTemp.content.cloneNode(true);
    let characteristicList = neighborHtml.querySelectorAll(".characteristic-list")[0];

    appendCharacteristicListLine(characteristicList, "Username", neighbor.username);
    appendCharacteristicListLine(characteristicList, "Имя", neighbor.name);
    appendCharacteristicListLine(characteristicList, "Почта", neighbor.email);
    appendCharacteristicListLine(characteristicList, "Телефон", neighbor.phone);

    return neighborHtml;
}

function appendCharacteristicListLine(characteristicList, title, value) {
    let listLineTemp = document.getElementById("characteristic-list-line-template");

    let listLine = listLineTemp.content.cloneNode(true);
    let spans = listLine.querySelectorAll("span");
    spans[0].textContent = title;
    spans[1].textContent = value;
    characteristicList.appendChild(listLine);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function printError() {
    removeWaitingGif()
    let neighborList = document.getElementsByClassName("flat-neighbors-list")[0];
    let errorText = document.createTextNode("Что-то пошло не так:(");
    neighborList.appendChild(errorText);
}

function appendWaitingGif() {
    let neighborList = document.getElementsByClassName("flat-neighbors-list")[0];
    let waitingGif = document.createElement("img");
    waitingGif.id = "waiting-gif";
    waitingGif.src = "../media/waiting_gif.gif";
    waitingGif.width = 200;
    neighborList.appendChild(waitingGif);
}

function removeWaitingGif() {
    let neighborList = document.getElementsByClassName("flat-neighbors-list")[0];
    neighborList.removeChild(neighborList.getElementsByTagName("img")[0]);
}