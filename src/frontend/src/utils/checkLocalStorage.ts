/**
 * Making sure the user has a valid token for authentication.
 * If not, the user will be redirected into login page.
 */ 
export const checkLocalStorage = () => {
  if (!localStorage.getItem("auth_token")) {
    window.location.href = "/login";
  }
}
