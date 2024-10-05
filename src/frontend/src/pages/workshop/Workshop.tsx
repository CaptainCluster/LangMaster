import Header from "../../components/Header";
import QuizCreateForm from "../../components/quiz/QuizCreateForm";
import { useEffect, useState } from "react";
import useStore from "../../stores/store";

const Workshop = () => {
  const { updateCurrentPageName } = useStore();
  const [createComponent, setCreateComponent] = useState<JSX.Element>(<></>);

  useEffect(() => {
    
    // Redirecting upon lacking authentication
    if (!localStorage.getItem("auth_token")) {
      window.location.href = "/login";
    }
    updateCurrentPageName("Workshop");

    // Rendering a component for creating a quiz
    setCreateComponent(
      <QuizCreateForm setCreateComponent={setCreateComponent} />
    );
  }, []);

  return (
    <>
      <Header></Header>
      {createComponent}
    </>
  );
};

export default Workshop;
