import Header from "../../components/Header";
import Credentials from "../../components/Credentials";
import { useMutation } from "@tanstack/react-query";
import { ApiAuthenticate } from "../../api/ApiAuthenticate";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/store";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const { updateCurrentPageName } = useStore();

  // POST request for registering user, redirecting to login page upon success
  const { mutate } = useMutation({
    mutationFn: ApiAuthenticate.registerUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

  // Redirect to home page if already authenticated. Otherwise displaying current page name.
  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      window.location.href = "/";
    }
    updateCurrentPageName("Register");
  }, []);

  // Listening to the FORM request. Triggering registration POST request on submission.
  const submitRegister = (username: string, password: string) => {
    mutate({
      username: username,
      password: password,
    });
  };

  return (
    <>
      <Header />
      <div id="page-register">
        <Credentials onSubmit={submitRegister} />
      </div>
    </>
  );
}

export default Register;
