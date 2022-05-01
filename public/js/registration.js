window.onload = function() {
  var form = document.getElementById("reg-form");
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

    let res = await fetch(baseUrl + "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      let resData = await res.json();
      if (resData.status === "FIELD_ERROR") {
        alert("Ошибка введенных данных. Проверьте Email и пароль (>8 символом, есть буквы и цифры)");
        throw new Error(resData.status);
      }
      let user = { email: resData.user.email };

      let resNewUser = await fetch(baseUrl + "/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });

      window.location.href = baseUrl;
    } else {
      alert("Проблемы с SuperTokens");
    }
  });
};