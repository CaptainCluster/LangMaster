import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";

const DeleteQuiz = ({ id }: { id: number }) => {
  const [confirmation, setConfirmation] = useState(<></>);
  const [clicked, setClicked]           = useState(false);
  
  const handleDeleteClick = () => {
    setClicked(previousClicked => {
      !previousClicked ? setConfirmation(<ConfirmDelete id={id} />) : setConfirmation(<></>);
      return !clicked;
    })
  }

  return (
    <div>
      <button 
        className="self-end text-red-800 cursor-pointer hover:text-red-600 hover:font-bold"
        onClick={handleDeleteClick}
      >DELETE</button>
      {confirmation}
    </div>
  );
}

export default DeleteQuiz;
