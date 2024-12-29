import { deleteQuiz } from "../../../api/workshop";

const ConfirmDelete = ({ id }: {id: number}) => {
  
  const deleteClickedQuiz = async () => {
    await deleteQuiz(id);
    window.location.href = "/workshop/search";
  }

  return (
    <div className="grid">
      <div>Are you sure?</div>
      <div className="grid grid-cols-2">
        <p 
          className="cursor-pointer hover:text-yellow-600 hover:font-bold"
          onClick={deleteClickedQuiz}
        >Yes</p>
        <p 
          className="cursor-pointer hover:text-yellow-600 hover:font-bold"
          onClick={() => { window.location.href = "/workshop/search" }}
        >No</p>
      </div>
    </div>
  );
}

export default ConfirmDelete;
