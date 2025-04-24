import arrowDown from "../../assets/arrow-down-1.svg";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../Logout";
import NavEntry from "../../types/NavEntry";

const HeaderDropDown = ({
  dropdownText,
  options,
}: {
  dropdownText: string;
  options: NavEntry[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(options);

  return (
    <div className="mx-[1vw]">
      <div
        className="flex flex-col items-center"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex text-[30px] flex-row items-center">
          {dropdownText}
          <img className="w-1/4 h-1/4 mx-3" src={arrowDown} />
        </div>
      </div>
      {isOpen ? (
        <div
          className="absolute flex flex-col text-black bg-white p-1 rounded-[6px]"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {options.map((entry: NavEntry, index: number) =>
            entry?.isLink ? (
              <NavLink
                key={`navlink-${index}`}
                to={entry.url ? entry.url : ""}
                className="m-1 p-2 text-[24px] text-black"
                style={{ textDecoration: "none" }}
              >
                {entry.text}
              </NavLink>
            ) : (
              <Logout />
            ),
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default HeaderDropDown;
