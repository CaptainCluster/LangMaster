import Header from "../../components/Header";
import { QuizCreate } from "../../components/QuizCreate";
import { useEffect } from "react";
import useStore from "../../stores/store";

export const Workshop = () => {
  const { updateCurrentPageName } = useStore();

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      window.location.href = "/login";
    }
    updateCurrentPageName("Workshop");
  }, []);
  return (
    <>
      <Header></Header>
      <QuizCreate />
    </>
  );
};
