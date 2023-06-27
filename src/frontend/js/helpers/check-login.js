const token = window.sessionStorage.token;

if (!token) {
  window.location.replace("/login");
}
