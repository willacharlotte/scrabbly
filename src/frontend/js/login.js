const password = document.getElementById("register-password");
const passwordVerify = document.getElementById("register-password-verify");

const validatePassword = () => {
  if (password.value != passwordVerify.value)
    passwordVerify.setCustomValidity("Passwords don't match");
  else passwordVerify.setCustomValidity("");
};

password.onchange = validatePassword;
passwordVerify.onkeyup = validatePassword;

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
