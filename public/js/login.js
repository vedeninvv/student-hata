window.onload = function() {
  var form = document.getElementById("login-form");
  form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
      formFields: [
        {
          id: "email",
          value: email
        },
        {
          id: "password",
          value: password
        }
      ]
    };

    let res = await fetch(baseUrl + "/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      window.location.href = baseUrl;
    } else {
      location.reload();
    }
  });
};