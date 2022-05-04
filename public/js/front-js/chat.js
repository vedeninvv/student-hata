function init() {
  function handleSubmitNewMessage(event) {
    event.preventDefault();
    socket.emit("message", { data: message.value });
  }

  const form = document.getElementById("form-post-message");
  form.addEventListener("submit", handleSubmitNewMessage);

  const socket = io(baseUrl + "/chat");

  const message = document.getElementById("message");
  const messages = document.getElementById("messages");

  socket.on("message", ({ data }) => {
    handleNewMessage(data);
  });

  const handleNewMessage = (message) => {
    messages.appendChild(buildNewMessage(message));
  };

  const buildNewMessage = (message) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    return li;
  };
}

window.addEventListener("load", init);