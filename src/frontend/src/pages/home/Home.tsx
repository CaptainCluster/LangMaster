import Header from "../../components/Header";
import useStore from "../../stores/store";
import { useEffect, useState } from "react";
import { redirectForNoToken } from "../../utils/checkLocalStorage";
import NewsPanel from "./NewsPanel";
import SuggestionsPanel from "./SuggestionsPanel";
import LinksPanel from "./LinksPanel";
import { checkTokenExpiration } from "../../api/authenticate";
import Notification from "../../components/notification/Notification";

const Home = () => {
  const { updateCurrentPageName } = useStore();
  const [welcomeMessage, setWelcomeMessage] = useState<String | null>("");

  useEffect(() => {
    checkTokenExpiration();
    redirectForNoToken();
    if (localStorage.getItem("auth_username")) {
      setWelcomeMessage(`${localStorage.getItem("auth_username")}!`);
    } else {
      setWelcomeMessage("Failed to fetch your username.");
    }
    updateCurrentPageName("Home");
  }, []);

  return (
    <>
      <Header />
      <div className="container grid items-center">
        <h4 className="text-center mt-5">
          Welcome, <span className="animate-flash">{welcomeMessage}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-6 fade-in">
          <NewsPanel />
          <SuggestionsPanel />
          <LinksPanel />
        </div>
      </div>
      <Notification />
    </>
  );
};

export default Home;
