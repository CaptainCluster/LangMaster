const removeStorageItems = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_username");
};

export default removeStorageItems;
