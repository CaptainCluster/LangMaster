import useStore from "../../stores/store";
import { useEffect } from "react";
import ListQuiz from "../../components/learn/ListQuiz"; 
import { redirectForNoToken } from "../../utils/checkLocalStorage";

const Learn = () => {
 
  const { updateCurrentPageName } = useStore();
  
  /// Redirecting upon a lack of authentication.
  useEffect(() => {
    redirectForNoToken();
    updateCurrentPageName("Learn");
  }, []);

  return (
      <ListQuiz redirectInit="/quiz/"/>
  )
}

export default Learn;
