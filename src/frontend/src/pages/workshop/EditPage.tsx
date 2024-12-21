import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useStore from "../../stores/store";
import { redirectForNoToken } from "../../utils/checkLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
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
   
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["news"],
    queryFn: () => api.workshop.getQuizById(quizId as string),
  });
  
  if (isLoading) {
    return <span className="text-white">Loading...</span>;
  }
  if (isError) {
    return <span className="text-white">Error: {error.message}</span>;
  }
  if (data === undefined) {
    return <span className="text-white">No data</span>;
  }
  
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
