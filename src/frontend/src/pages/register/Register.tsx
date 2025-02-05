import Header from "../../components/Header";
import Credentials from "../../components/Credentials";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/store";
import { useEffect } from "react";
import { api } from "../../api";
import { redirectForToken } from "../../utils/checkLocalStorage";
import Notification from "../../components/notification/Notification";
import { useNotificationStore } from "../../stores/notificationStore";

const Register = () => {
  const navigate = useNavigate();
  const { updateCurrentPageName } = useStore();
  const { triggerNotification } = useNotificationStore();
  
  // POST request for registering user, redirecting to login page upon success
  const { mutate } = useMutation({
    mutationFn: api.auth.registerUser,
    onSuccess: (data) => {
      if (data.success) {
        triggerNotification(data.msg, "success");
        return;
      }
      triggerNotification(data.msg, "error");
      navigate("/login");
    },
  });

  // Redirect to home page if already authenticated. Otherwise displaying current page name.
  useEffect(() => {
    redirectForToken();
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
      <div className="container my-5" id="page-register">
        <Credentials onSubmit={submitRegister} />
      </div>
      <Notification />
    </>
  );
};

export default Register;
