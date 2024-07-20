import Header from "../../components/Header";
import Credentials from "../../components/Credentials";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/authenticate";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/store";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const { updateCurrentPageName } = useStore();

  // Sending a POST request request in order to log the client in.
  // Redirects if JWT was obtained.
  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      if (localStorage.getItem("auth_token")) {
        navigate("/");
      }
    },
  });

  // Authenticated users are redirected. Otherwise current page name is displayed.
  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      window.location.href = "/";
    }
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

export default Register;
