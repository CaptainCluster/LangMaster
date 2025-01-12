import DeleteQuiz from "../delete/DeleteQuiz";

const SearchPanel = ({ searchData }) => {
  return (
    <div className="content grid justify-center"> 
      {searchData.map((dataEntry) => (
        <div className="flex justify-between w-screen border border-white rounded p-2 my-1">
          <div
            className="cursor-pointer hover:text-yellow-400 hover:font-bold"
            onClick={() => window.location.href = `/workshop/edit/${dataEntry.id}`}
          >
            {dataEntry.name}
          </div>
          <DeleteQuiz id={dataEntry.id}/>
        </div>
      ))}
    </div>
  ); 
}

export default SearchPanel;
