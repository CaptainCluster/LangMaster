import NavDropdown from "react-bootstrap/NavDropdown";

export const Logout = () => {
  const logUserOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <NavDropdown.Item onClick={() => logUserOut()}>Log Out</NavDropdown.Item>
  );
};
