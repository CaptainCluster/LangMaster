import { useState } from "react";
import useStore from "../../stores/store";

const AnswerForm = () => {
  const [answerTitle, setAnswerTitle] = useState("");
  return (
    <>
      <form>
        <input type="text" placeholder="Answer Name"></input>

        <label htmlFor="is-correct">Is Correct</label>
        <input id="is-correct" type="checkbox"></input>
      </form>
    </>
  );
};

export default AnswerForm;
