import { NavLink } from "react-router-dom";

const HeaderLink = ({ url, text }: { url: string; text: string }) => {
  return (
    <NavLink
      to={url}
      className="text-white mx-1 p-2"
      style={{ textDecoration: "none" }}
    >
      {text}
    </NavLink>
  );
};

export default HeaderLink;
