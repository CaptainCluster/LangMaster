const redirectForNoToken = () => {
  if (!localStorage.getItem("auth_token")) {
    window.location.href = "/login";
  }
}

const redirectForToken = () => {
  if (localStorage.getItem("auth_token")) {
    window.location.href = "/";
  }
}

export { redirectForToken, redirectForNoToken }
