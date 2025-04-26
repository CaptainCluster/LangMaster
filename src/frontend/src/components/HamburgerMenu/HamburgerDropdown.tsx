import { useState } from "react";
import HamburgerDropdownElements from "../../components/HamburgerMenu/HamburgerDropdownElements";
import { UseBoundStore, StoreApi } from "zustand";
import HamburgerMenuStore from "../../types/stores/HamburgerMenuStore";
import NavEntry from "../../types/NavEntry";
import arrowDown from "../../assets/arrow-down-1.svg";

const HamburgerDropdown = ({
  links,
  title,
  useHamburgerMenuStore,
}: {
  links: NavEntry[];
  title: string;
  useHamburgerMenuStore: UseBoundStore<StoreApi<HamburgerMenuStore>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex flex-col  items-end"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex text-white text-[16px] py-2 flex-row items-center">
          {title}
          <img className="w-1/4 h-1/4 mx-3" src={arrowDown} />
        </div>
      </div>
      {isOpen ? (
        <HamburgerDropdownElements
          links={links}
          useHamburgerMenuStore={useHamburgerMenuStore}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default HamburgerDropdown;
