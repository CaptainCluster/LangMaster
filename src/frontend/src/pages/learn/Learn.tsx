import useStore from "../../stores/store";
import { useEffect } from "react";
import Header from "../../components/Header";
import ListQuiz from "../../components/learn/ListQuiz"; 
import { redirectForNoToken } from "../../utils/checkLocalStorage";
import SearchPanel from "../../components/search/SearchPanel";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import filterBySearchParam from "../../utils/filterBySearchParam";
import { useState } from "react";

const Learn = () => {
  const [searchParam, setSearchParam] = useState("");
 
  const { updateCurrentPageName } = useStore();
  
  /// Redirecting upon a lack of authentication.
  useEffect(() => {
    redirectForNoToken();
    updateCurrentPageName("Learn");
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

  const filteredData = filterBySearchParam(searchParam, data.data); 

  return (
    <>
      <Header />
      <div className="search grid justify-start p-6">
        <p>Search for quizzes</p>
        <input
          className="text-black"
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}>
        </input>
      </div>
      <SearchPanel searchData={filteredData} urlInitialPart={"/quiz/"}/>
    </>
  )
}

export default Learn;
