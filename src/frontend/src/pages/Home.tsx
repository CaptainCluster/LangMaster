import Header from "../components/Header";
import useStore from "../stores/store";
import { useEffect, useState } from "react";

function Home() {
  const { updateCurrentPageName } = useStore();
  const [welcomeMessage, setWelcomeMessage] = useState<String | null>("");

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      window.location.href = "/login";
    }

    if (localStorage.getItem("auth_username")) {
      setWelcomeMessage(`Welcome, ${localStorage.getItem("auth_username")}!`);
    } else {
      setWelcomeMessage("Failed to fetch your username.");
    }

    updateCurrentPageName("Home");
  }, []);

  return (
    <>
      <Header />
      <div id="page-index">
        <h4>{welcomeMessage}</h4>
      </div>
    </>
  );
}

export default Home;
