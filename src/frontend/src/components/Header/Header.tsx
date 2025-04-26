import HeaderLink from "./HeaderLink";
import HeaderLogo from "./HeaderLogo";
import HeaderDropDown from "./HeaderDropdown";
import NavEntry from "../../types/NavEntry";
import dropdownOptions from "../../data/dropdownOptions";
import dropdownTexts from "../../data/dropdownTexts";

const Header = () => {
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
        {dropdownOptions.map((dropdownOption: NavEntry[], index: number) => (
          <HeaderDropDown
            dropdownText={dropdownTexts[index]}
            options={dropdownOption}
          />
        ))}
      </>
    );
  };

  return (
    <div className="hidden md:flex w-screen items-center bg-header">
      <HeaderLogo />
      <div className="flex w-[100%] justify-end items-center">
        {displayNav()}
      </div>
    </div>
  );
};

export default Header;
