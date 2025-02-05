import { useQuery }           from "@tanstack/react-query";
import { api }                from "../../api";
import { useState }           from "react";
import filterBySearchParam    from "../../utils/filterBySearchParam";
import useStore               from "../../stores/store";
import { useEffect }          from "react";
import DeleteQuiz             from "../../pages/workshop/delete/DeleteQuiz";
import { redirectForNoToken } from "../../utils/checkLocalStorage";
import QuizResponse from "../../types/response/QuizResponse";

const ListQuizzes = ({ redirectInit }: { redirectInit: string; }) => {  
  const { updateCurrentPageName } = useStore(); // State management
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    redirectForNoToken();
    updateCurrentPageName("Workshop");
  }, []);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["news"],
    queryFn: () => api.workshop.getAllQuizzes()
  });

  if (isLoading) {
    return <span className="text-white">Loading...</span>;
  }
  if (isError) {
    return <span className="text-white">Error: {error.message}</span>;
  }
  if (data === undefined) {
    return <span className="text-white">No data</span>;
  }
  
  let filteredData = [];
  if ("data" in data) {
    filteredData = filterBySearchParam(searchParam, data.data); 
  }

  return (
    <>
      <div className="container">
        <div className="search grid justify-start p-6">
          <p>Search for quizzes</p>
          <input
            className="text-black bg-white rounded-md"
            value={searchParam}
            onChange={(event) => setSearchParam(event.target.value)}>
          </input>
        </div>
        <ul>
            {filteredData.map((dataEntry: QuizResponse) => (
              <li className="flex justify-between border border-white rounded p-2 my-1">
                <div
                  className="cursor-pointer hover:text-yellow-400"
                  onClick={() => window.location.href = `${redirectInit}${dataEntry.id}`}
                >
                  {dataEntry.name}
                </div>
                <DeleteQuiz id={dataEntry.id}/>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default ListQuizzes;
