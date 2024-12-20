import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import useStore from "../../stores/store";
import Header from "../../components/Header";
import Credentials from "../../components/Credentials";
import { redirectForToken } from "../../utils/checkLocalStorage";
import { api } from "../../api";

const Login = () => {
  const navigate = useNavigate();
  const { updateCurrentPageName } = useStore();

  // Sending a POST request request in order to log the client in.
  // Redirects if JWT was obtained.
  const { mutate } = useMutation({
    mutationFn: api.auth.loginUser,
    onSuccess: () => {
      if (localStorage.getItem("auth_token")) {
        navigate("/");
      }
    },
  });

  // Authenticated users are redirected. Otherwise current page name is displayed.
  useEffect(() => {
    redirectForToken();
    updateCurrentPageName("Login");
  }, []);

  // Executes upon form submission.
  const submitLogin = (username: string, password: string) => {
    mutate({
      username: username,
      password: password,
    });
  };

  return (
    <>
      <Header />
      <div id="page-register">
        <Credentials onSubmit={submitLogin} />
      </div>
    </>
  );
};

export default Login;
