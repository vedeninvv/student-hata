function init(){
  const socket = io(baseUrl + "/chat");

  socket.on("message", ({ data }) => {
    toastr.info(data)
  });
}

window.addEventListener("load", init);