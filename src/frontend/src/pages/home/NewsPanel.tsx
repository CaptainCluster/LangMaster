import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import Panel from "./Panel";

const NewsPanel = () => {
  const PANEL_HEADER: string = "News";

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["news"],
    queryFn: () => api.news.getLatestNews(),
  });

  if (isLoading) {
    return <Panel header={PANEL_HEADER} text={"Loading..."} />;
  }
  if (isError) {
    return <Panel header={PANEL_HEADER} text={`Error: ${error.message}`} />;
  }
  if (!data) {
    return <Panel header={PANEL_HEADER} text={"No data"}/>;
  }
  if ("data" in data) {
     return <Panel header={PANEL_HEADER} text={data.data.content} />;
  }
  return <Panel header={PANEL_HEADER} text={"Error in loading news data."}/>;
}

export default NewsPanel;
