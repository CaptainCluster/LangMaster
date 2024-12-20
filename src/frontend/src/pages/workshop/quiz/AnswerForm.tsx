import { useEffect, useState } from "react";
import quizStore from "../../../stores/quizStore";
import AnswerState from "../../../models/state/AnswerState";

const AnswerForm = ({ questionIndex, answerIndex }: any) => {
  const [answerTitle, setAnswerTitle] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const { processAnswerForQuiz } = quizStore();

  useEffect(() => {
    const answerState: AnswerState = {
      questionIndex: questionIndex,
      answerIndex: answerIndex,
      title: answerTitle,
      isCorrect: isCorrect,
    };
    processAnswerForQuiz(answerState);
  }, [answerTitle, isCorrect]);

  return (
    <div className="answer-form-element">
      <form>
        <input
          type="text"
          className="text-black"
          placeholder="Answer Title"
          onChange={(event) => setAnswerTitle(event.target.value)}
        ></input>
        <label htmlFor="is-correct">Is Correct</label>
        <input
          id="is-correct"
          type="checkbox"
          onChange={(event) => setIsCorrect(event.target.checked)}
        ></input>
      </form>
    </div>
  );
};

export default AnswerForm;
