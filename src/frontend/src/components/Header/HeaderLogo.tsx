import { useNavigate } from "react-router-dom";
import logo from "../../assets/lance_the_langmaster_duck.svg";

const HeaderLogo = () => {
  const navigate = useNavigate();
  return (
    <>
      <img
        className="object-contain z-10 left-0 top-0 w-[10%] h-[10%] h-auto font-semibold hover:cursor-pointer"
        src={logo}
        alt="Logo"
        onClick={() => {
          navigate("/");
        }}
      />
      <span className="italic text-[42px] hover:text-yellow-300">
        LangMaster
      </span>
    </>
  );
};

export default HeaderLogo;
