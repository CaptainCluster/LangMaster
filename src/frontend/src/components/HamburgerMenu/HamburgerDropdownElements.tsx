import { UseBoundStore, StoreApi } from "zustand";
import HamburgerMenuStore from "../../types/stores/HamburgerMenuStore";
import { NavLink } from "react-router-dom";
import NavEntry from "../../types/NavEntry";

const HamburgerDropdownElements = ({
  links,
  useHamburgerMenuStore,
}: {
  links: NavEntry[];
  useHamburgerMenuStore: UseBoundStore<StoreApi<HamburgerMenuStore>>;
}) => {
  const { updateIsOpen } = useHamburgerMenuStore();
  return (
    <div className="flex flex-col bg-[var(--color-cluster)] text-[2.5vh] rounded-b-[6px]">
      {links.map((entry: NavEntry, index: number) => (
        <NavLink
          key={`navlink-${index}`}
          to={entry.url ? entry.url : ""}
          className="m-1 p-4 px-7 text-[2vh] text-white"
          style={{ textDecoration: "none" }}
          onClick={() => updateIsOpen(false)}
        >
          {entry.text}
        </NavLink>
      ))}
    </div>
  );
};

export default HamburgerDropdownElements;
