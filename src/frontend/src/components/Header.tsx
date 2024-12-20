import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import useStore from "../stores/store";
import Logout from "./Logout";

const Header = () => {
  const { currentPageName } = useStore();

  // Fetching user from JWT, allowing redirection to profile page
  const username = localStorage.getItem("auth_username")
    ? localStorage.getItem("auth_username")
    : "";

  /**
   * Checks whether user is authenticated and selects what
   * content will be in the header for navigation.
   *
   * @returns {JSX.Element} The header navigation content
   */
  const displayNav = () => {
    /**
     * For unauthenticated users
     *
     * @Displays
     * ---------
     * 1) Link to register page
     * 2) Link to Login page
     */
    if (!localStorage.getItem("auth_token")) {
      return (
        <Nav className="me-auto">
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      );
    }

    /**
     * For authenticated users
     *
     * @Displays
     * ---------
     * 1) Link to home page
     * 2) Link to profile page
     *
     * 3) Dropdown
     *    3.1 - Settings
     *    3.2 - Log Out
     */
    return (
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href={`/profile/${username}`}>Profile</Nav.Link>
        <Nav.Link href="/learn">Learn</Nav.Link>
        <Nav.Link href="/workshop">Workshop</Nav.Link>
        <NavDropdown title="" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
          <NavDropdown.Item href="/leaderboards">Leaderboards</NavDropdown.Item>
          <Logout />
        </NavDropdown>
      </Nav>
    );
  };

  // The final return for the Header
  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>{currentPageName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">{displayNav()}</Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
