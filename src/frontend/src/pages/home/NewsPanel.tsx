import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";

const NewsPanel = () => {

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["news"],
    queryFn: () => api.news.getLatestNews(),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (!data || !data.data) {
    return <span>No data</span>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg transform">
      <h4 className="text-center border-b border-gray-200 pb-2">News</h4>
      {data.data.content}
    </div>
  );
}

export default NewsPanel;
