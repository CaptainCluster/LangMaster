import useStore from "../stores/store";
import HeaderLink from "./HeaderLink";
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
        <>
          <HeaderLink url="/register" text="Register"/>
          <HeaderLink url="/login" text="Login"/>
        </>
      );
    }

    return (
      <>
        <HeaderLink url="/" text="Home"/>
        <HeaderLink url={`/profile/${username}`} text="Profile"/>
        <HeaderLink url="/learn" text="Learn"/>
        <HeaderLink url="/workshop" text="Workshop"/>
        <Logout />
      </>
    );
  };

  return (
    <div className="flex w-screen bg-[#292929] border border-white rounded-lg p-2">
      <div className="italic ml-2 mr-6 hover:text-yellow-300">
        {currentPageName}
      </div>
      <div>
        {displayNav()}
      </div>
    </div>
  );
};

export default Header;
