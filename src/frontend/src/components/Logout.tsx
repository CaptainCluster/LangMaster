import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../stores/notificationStore";

const Logout = () => {
  const { triggerNotification } = useNotificationStore();
  let navigate = useNavigate();

  const logUserOut = () => {
    localStorage.clear();
    triggerNotification("You have been logged out.", "neutral");
    navigate("/login");
  };

  return (
    <a
      className="m-1 p-2 px-7 text-[14px] md:mx-1 md:p-2 md:text-[24px] text-black cursor-pointer"
      style={{ textDecoration: "none" }}
      onClick={() => logUserOut()}
    >
      Log Out
    </a>
  );
};

export default Logout;
