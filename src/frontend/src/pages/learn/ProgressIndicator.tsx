import { useState } from "react";

const ProgressIndicator = ({ questionAmount }: { questionAmount: number }) => {
  const [currentQuizNumber, setCurrentQuizNumber] = useState(0);

  const width = ((100/questionAmount) * currentQuizNumber).toString();

  return (
    <div className="grid">
      <div className="flex mt-3 ml-3 w-1/2 h-6 bg-gray-200 rounded-full dark:bg-gray-700">
        <div style={{width: `${width}%`}}>
          <div className={`h-6 bg-blue-600 rounded-full dark:bg-blue-500`}></div> 
        </div>
      </div> 
      <div className="ml-3 mt-2">
        <p className="text-[26px]">{currentQuizNumber} / {questionAmount}</p>
      </div>
    </div> 
  );
}

export default ProgressIndicator;
