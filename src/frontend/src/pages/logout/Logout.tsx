import { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.clear();
    window.location.href = "/login";
  }, []);

  return <></>;
}

export default Logout;
