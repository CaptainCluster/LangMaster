import { useQuery }         from "@tanstack/react-query";
import { api }              from "../../api";
import { useState }         from "react";
import filterBySearchParam  from "../../utils/filterBySearchParam";
import Header               from "../../components/Header";
import useStore             from "../../stores/store";
import { useEffect }        from "react";
import { redirectForNoToken } from "../../utils/checkLocalStorage";

const SearchPage = () => {  
  const { updateCurrentPageName } = useStore(); // State management
  const [searchParam, setSearchParam] = useState("kakka");

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

  const filteredData = filterBySearchParam(searchParam, data.data); 
  
  return (
    <div>
      <Header />
      <div className="search grid justify-start p-6">
        <p>Search for quizzes</p>
        <input
          className="text-black"
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}>
        </input>
      </div>
      <div className="content grid justify-center"> 
        {filteredData.map((dataEntry) => (
          <div className="flex justify-between w-screen border border-white rounded p-2 my-1"
            onClick={() => window.location.href = `/workshop/edit/${dataEntry.id}`}
          >{dataEntry.name}
            <button className="self-end text-red-800">DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
