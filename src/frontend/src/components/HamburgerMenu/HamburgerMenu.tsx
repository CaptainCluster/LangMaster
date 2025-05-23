import useHamburgerMenuStore from "../../stores/useHamburgerMenuStore";
import { useLocation } from "react-router-dom";
import dropdownTexts from "../../data/dropdownTexts";
import dropdownOptions from "../../data/dropdownOptions";
import NavEntry from "../../types/NavEntry";
import HeaderLink from "../HeaderLink";
import HamburgerDropdown from "./HamburgerDropdown";
import { useEffect } from "react";

const username = localStorage.getItem("auth_username")
  ? localStorage.getItem("auth_username")
  : "";

const HamburgerMenu = () => {

  const location = useLocation();
  useEffect(() => {}, [location])

  const { isOpen, updateIsOpen } = useHamburgerMenuStore();
  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className="bg-[var(--color-header)]">
        <button
          className="flex content-start md:hidden p-2"
          onClick={() => updateIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } bg-[var(--color-header)] px-6 pb-3 list-none min-h-[20vh] text-right side-menu hamburger-expansion`}
      >
        {dropdownOptions.length === 0 ? (
          <p>No side content</p>
        ) : (
          <div className="flex flex-col">
            {
              localStorage.getItem("auth_token")
              ?  <>
                  <HeaderLink url="/" text="Home" />
                  <HeaderLink url={`/profile/${username}`} text="Profile" />
                  <HeaderLink url="/learn" text="Learn" />
                  <HeaderLink url="/workshop" text="Workshop" />
                  {dropdownOptions.map(
                    (dropdownOption: NavEntry[], index: number) => (
                      <HamburgerDropdown
                        links={dropdownOption}
                        title={dropdownTexts[index]}
                        useHamburgerMenuStore={useHamburgerMenuStore}
                      />
                    )
                  )}
                  </>
              : <>
                  <HeaderLink url="/register" text="Register" />
                  <HeaderLink url="/login" text="Login" />
                </>
            }
          </div>
         
        )}
      </div>
    </>
  );
};

export default HamburgerMenu;
