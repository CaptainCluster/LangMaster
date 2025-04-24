import HeaderLink from "./HeaderLink";
import HeaderLogo from "./HeaderLogo";
import HeaderDropDown from "./HeaderDropdown";
import NavEntry from "../../types/NavEntry";

const Header = () => {
  // Fetching user from JWT, allowing redirection to profile page
  const username = localStorage.getItem("auth_username")
    ? localStorage.getItem("auth_username")
    : "";

  const quizDropdownOptions: NavEntry[] = [
    {
      url: "/workshop",
      text: "Workshop",
      isLink: true,
    },
    {
      url: "/learn",
      text: "Learn",
      isLink: true,
    },
  ];

  const accountDropdownOptions: NavEntry[] = [
    {
      url: `/profile/${username}`,
      text: "Profile",
      isLink: true,
    },
    {
      text: "Logout",
      isLink: false,
    },
  ];

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
        <>
          <HeaderLink url="/register" text="Register" />
          <HeaderLink url="/login" text="Login" />
        </>
      );
    }

    return (
      <>
        <HeaderLink url="/" text="Home" />
        <HeaderDropDown dropdownText="Quiz" options={quizDropdownOptions} />
        <HeaderDropDown
          dropdownText="Account"
          options={accountDropdownOptions}
        />
      </>
    );
  };

  return (
    <div className="flex w-screen items-center bg-header">
      <HeaderLogo />
      <div className="flex w-[100%] justify-end items-center">
        {displayNav()}
      </div>
    </div>
  );
};

export default Header;
