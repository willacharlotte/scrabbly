const passwordRegister = document.getElementById("register-password");
const passwordVerify = document.getElementById("register-password-verify");

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
      .replaceAll(numbers, "")
      .replaceAll(lowerLetters, "")
      .replaceAll(upperLetters, "").length > 0;

  return hasNumbers + hasLowerLetters + hasUpperLetters + hasSymbols >= 3;
};

const validateRegisterPassword = () => {
  if (!checkPassword(passwordRegister.value)) {
    passwordRegister.setCustomValidity(
      "Password length should be greater than 8 " +
        "and contain at least 3 of the following 4 sets: " +
        "numbers, uppercase letters, lowercase letters and symbols"
    );
  } else passwordRegister.setCustomValidity("");
};

const validateVerifyPassword = () => {
  if (passwordVerify.value != passwordRegister.value) {
    passwordVerify.setCustomValidity("Passwords don't match");
  } else passwordVerify.setCustomValidity("");
};

passwordRegister.addEventListener("change", validateRegisterPassword);
passwordVerify.addEventListener("keyup", validateVerifyPassword);
