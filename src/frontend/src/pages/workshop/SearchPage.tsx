import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
const SearchPage = () => {
  
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
  
  return (
    <div>
      {data.data.map((dataEntry) => (
        <div>{dataEntry.name}</div>
      )) }
    </div>
  );
}

export default SearchPage;
