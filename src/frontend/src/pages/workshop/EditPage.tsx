import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useStore from "../../stores/store";
import { redirectForNoToken } from "../../utils/checkLocalStorage";


/**
 * Uses a GET request to confirm the existence of a quiz. 
 * 1) Exists         - The user can edit the quiz 
 * 2) Does not exist - The user is told the quiz does not 
 *                     exist.
 */ 
const EditPage = () => {
  const { updateCurrentPageName } = useStore(); // State management
  const quizId: string | undefined = useParams().id; 

  useEffect(() => {
    redirectForNoToken();
    updateCurrentPageName("Workshop");
  }, []);
  
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-56">
        <p>{quizId}</p> 
      </div>
    </>
  )
}

export default EditPage;
