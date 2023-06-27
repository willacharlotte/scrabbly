const token = window.sessionStorage.token;

if (!token) {
  // do validtion on token
  window.location.replace("/login");
}
