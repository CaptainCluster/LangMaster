import { useState } from "react";

const ProgressIndicator = ({ questionAmount }: { questionAmount: number }) => {
  const [currentQuizNumber, setCurrentQuizNumber] = useState(1);
  
  return (
    <div>{currentQuizNumber} / {questionAmount}</div> 
  );
}

export default ProgressIndicator;
