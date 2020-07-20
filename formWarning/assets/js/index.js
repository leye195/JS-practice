(() => {
  const email = document.querySelector("#email"),
    emailLabel = document.querySelector("#email-empty"),
    password = document.querySelector("#password1"),
    passwordLabel = document.querySelector("#password1-empty"),
    passwordAgain = document.querySelector("#password2"),
    passwordAgainLabel = document.querySelector("#password2-empty"),
    submitButton = document.querySelector("#submit");

  const emailValidator = (email) => {
    if (/^\w+([\.-]\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    const {
      target: { id, value },
    } = e;
    if (id === "email" && value.length > 0 && emailValidator(value)) {
      if (!emailLabel.classList.contains("hide"))
        emailLabel.classList.add("hide");
    } else if (id === "password1" && value.length > 0) {
      if (!passwordLabel.classList.contains("hide"))
        passwordLabel.classList.add("hide");
    } else if (id === "password2" && value.length > 0) {
      if (
        value === password.value &&
        !passwordAgainLabel.classList.contains("hide")
      ) {
        passwordAgainLabel.classList.add("hide");
      }
    }
  };
  const handleSubmit = (e) => {
    if (
      email.value.length > 0 &&
      email.value.includes("@") &&
      password.value.length > 0 &&
      passwordAgain.value.length > 0 &&
      password.value === passwordAgain.value
    ) {
      alert("submit success");
      email.value = "";
      password.value = "";
      passwordAgain.value = "";
    } else {
      if (email.value.length === 0 || !emailValidator(email.value)) {
        emailLabel.classList.remove("hide");
      }
      if (password.value.length === 0) {
        passwordLabel.classList.remove("hide");
      }
      if (
        passwordAgain.value.length === 0 ||
        passwordAgain.value !== password.value
      ) {
        passwordAgainLabel.classList.remove("hide");
      }
    }
  };

  const init = () => {
    email.addEventListener("input", handleChange);
    password.addEventListener("input", handleChange);
    passwordAgain.addEventListener("input", handleChange);
    submitButton.addEventListener("click", handleSubmit);
  };
  init();
})();
