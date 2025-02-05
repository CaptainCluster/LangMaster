import Header from "../../components/Header";
import { useEffect } from "react";
import useStore from "../../stores/store";
import { redirectForNoToken } from "../../utils/checkLocalStorage";

const Workshop = () => {
  const { updateCurrentPageName } = useStore();

  useEffect(() => {
    redirectForNoToken();
    updateCurrentPageName("Workshop");
  }, []);

  return (
    <>
      <Header></Header>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-3 p-6 m-14 fade-in">
        <button 
          className="p-8 bg-neutral-700 rounded-lg shadow-lg transform transition-transform hover:scale-105 py-14"
          onClick={() => { window.location.href = "/workshop/create" }}>
          Create a quiz
        </button>
        <button 
          className="p-8 bg-neutral-700 rounded-lg shadow-lg transform transition-transform hover:scale-105 py-14"
          onClick={() => { window.location.href = "/workshop/search" }}>
          Alter an existing quiz</button>
      </div>
    </>
  );
};

export default Workshop;
