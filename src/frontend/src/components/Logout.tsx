const Logout = () => {
  const logUserOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <a 
      className="mx-1 p-2 text-white cursor-pointer" 
      style={{ textDecoration: "none" }}
      onClick={() => logUserOut()}>Log Out</a>
  );
};

export default Logout;
