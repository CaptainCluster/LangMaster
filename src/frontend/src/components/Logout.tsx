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
      className="mx-1 p-2 text-[24px] text-black cursor-pointer"
      style={{ textDecoration: "none" }}
      onClick={() => logUserOut()}
    >
      Log Out
    </a>
  );
};

export default Logout;
