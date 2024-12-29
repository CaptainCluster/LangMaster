import { deleteQuiz } from "../../../api/workshop";

const DeleteQuiz = ({ id }: { id: number }) => {

  const deleteClickedQuiz = async () => {
    await deleteQuiz(id);
    window.location.href = "/workshop/search";
  }

  return <button className="self-end text-red-800 cursor-pointer hover:text-red-600 hover:font-bold" onClick={deleteClickedQuiz}>DELETE</button>
}

export default DeleteQuiz;
