export default interface HamburgerMenuStore {
  isOpen: boolean;
  updateIsOpen: (newIsOpen: boolean) => void;
}
