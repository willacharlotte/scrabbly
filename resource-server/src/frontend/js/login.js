import {
  createCredentials,
  exchangeCredentials,
  validateToken,
} from "./helpers/identity-access.js";

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const badLogin = document.getElementById("bad-login");
const userExists = document.getElementById("user-exists");
const badRegister = document.getElementById("bad-register");

const login = async (user, pass) => {
  const data = {
    from: "username-password",
    to: "bearer",
    username: user,
    password: pass,
  };

  const res = await exchangeCredentials(data);

  switch (res.status) {
    case 200:
      const body = await res.json();
      window.sessionStorage.token = body.token;
      window.sessionStorage.tokenExpiry = body.expiresAt;
      window.sessionStorage.username = user;
      const isValidToken = await validateToken(window.sessionStorage.token); 
      if (isValidToken.status == 200){
        window.location.href = "/home";
      }
      break;
    case 401:
      badLogin.classList.remove("hidden");
  }
};

const register = async (user, pass) => {
  const data = {
    type: "username-password",
    username: user,
    password: pass,
  };

  const res = await createCredentials(data);

  switch (res.status) {
    case 201:
      const body = await res.json();
      const uuid = body.id;
      // post to back end??
      return true;
    case 409:
      userExists.classList.remove("hidden");
      return false;
    case 400:
      badRegister.classList.remove("hidden");
      return false;
  }
  return false;
};

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  await login(formData.get("username"), formData.get("password"));
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const user = formData.get("username");
  const pass = formData.get("password");

  if (await register(user, pass)) await login(user, pass);
});
