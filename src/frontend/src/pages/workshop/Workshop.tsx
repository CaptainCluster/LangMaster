import Header from "../../components/Header";
import QuizCreateForm from "./quiz/QuizCreateForm";
import { useEffect, useState } from "react";
import useStore from "../../stores/store";
import { redirectForNoToken } from "../../utils/checkLocalStorage";

const Workshop = () => {
  const { updateCurrentPageName } = useStore();
  const [createComponent, setCreateComponent] = useState<JSX.Element>(<></>);

  useEffect(() => {
    // Redirecting upon lacking authentication
    redirectForNoToken();
    updateCurrentPageName("Workshop");
    
    // Rendering a component for creating a quiz
    setCreateComponent(
      <QuizCreateForm setCreateComponent={setCreateComponent} />
    );
  }, []);

  return (
    <>
      <Header></Header>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-3 p-6 m-14">
        <button 
          className="p-8 bg-neutral-700 rounded-lg shadow-lg transform"
          onClick={() => { window.location.href = "/workshop/create" }}>
          Create a quiz
        </button>
        <button 
          className="p-8 bg-neutral-700 rounded-lg shadow-lg transform"
          onClick={() => { window.location.href = "/workshop/search" }}>
          Select an existing quiz</button>
      </div>
    </>
  );
};

export default Workshop;
