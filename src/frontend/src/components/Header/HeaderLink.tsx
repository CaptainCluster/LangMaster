import { NavLink } from "react-router-dom";

const HeaderLink = ({ url, text }: { url: string; text: string }) => {
  return (
    <NavLink
      to={url}
      className="text-white mx-14 p-2 text-[30px]"
      style={{ textDecoration: "none" }}
    >
      {text}
    </NavLink>
  );
};

export default HeaderLink;
