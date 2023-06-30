const passwordRegister = document.getElementById("register-password");
const passwordRegisterVerify = document.getElementById(
  "register-password-verify"
);
const passwordLogin = document.getElementById("login-password");

const checkPassword = (password) => {
  if (password.length < 8) return false;

  const numbers = /[0-9]/g;
  const lowerLetters = /[a-z]/g;
  const upperLetters = /[A-Z]/g;

  const hasNumbers = password.search(numbers) > -1;
  const hasLowerLetters = password.search(lowerLetters) > -1;
  const hasUpperLetters = password.search(upperLetters) > -1;
  const hasSymbols =
    password
      .replace(numbers, "")
      .replace(lowerLetters, "")
      .replace(upperLetters, "") > 0;

  return hasNumbers + hasLowerLetters + hasUpperLetters + hasSymbols >= 3;
};

const validateRegisterPassword = () => {
  if (checkPassword(passwordRegister.value))
    passwordRegisterVerify.setCustomValidity(
      "Password length should be greater than 8 " +
        "and contain at least 3 of the following 4 sets: " +
        "numbers, uppercase letters, lowercase letters and symbols"
    );
  if (passwordRegister.value != passwordRegisterVerify.value)
    passwordRegisterVerify.setCustomValidity("Passwords don't match");
  else passwordRegisterVerify.setCustomValidity("");
};

const validateLoginPassword = () => {
  if (checkPassword(passwordRegister.value))
    passwordRegisterVerify.setCustomValidity(
      "Password length should be greater than 8 " +
        "and contain at least 3 of the following 4 sets: " +
        "numbers, uppercase letters, lowercase letters and symbols"
    );
  else passwordRegisterVerify.setCustomValidity("");
};

passwordRegister.onchange = validateRegisterPassword;
passwordRegisterVerify.onkeyup = validateRegisterPassword;

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  // const token = await fetch("/token", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // });

  // validation !!

  const token = "gg";

  window.sessionStorage.token = token;

  setTimeout(() => {
    window.location.href = "/home";
  }, 1000);
});

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  // const token = await fetch("/token", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // }).then((res) => res.json());

  const token = "gg";

  window.sessionStorage.token = token;
  setTimeout(() => {
    window.location.href = "/home";
  }, 1000);
});
