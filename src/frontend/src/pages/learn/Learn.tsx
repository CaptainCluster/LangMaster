import useStore from "../../stores/store";
import { useEffect } from "react";
import Header from "../../components/Header";
import ListQuiz from "../../components/learn/ListQuiz"; 
import { checkLocalStorage } from "../../utils/checkLocalStorage";

const Learn = () => {
 
  const { updateCurrentPageName } = useStore();
  
  /// Redirecting upon a lack of authentication.
  useEffect(() => {
    checkLocalStorage();
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
