import useApiData from "../../../data/useApiData";
import { getTopics } from "../../../data/api";

export default function useTopics() {
  const { data, ...others } = useApiData(getTopics, [], []);

  return {
    topics: data,
    ...others,
  };
}
