import useStore from "../../stores/store";
import { useEffect } from "react";
import Header from "../../components/Header";
import ListQuiz from "../../components/learn/ListQuiz"; 

const Learn = () => {
 
  const { updateCurrentPageName } = useStore();
  
  /// Redirecting upon a lack of authentication.
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      window.location.href = "/login";
    }
    updateCurrentPageName("Learn");
  }, []);
  return (
    <>
      <Header />
      <ListQuiz />
    </>
  )
}

export default Learn;
