import { getTopics } from "./api";
import useApi from "./useApi";

export default function useTopics() {
  const { data, ...others } = useApi(getTopics, [], []);
  return {
    topics: data,
    ...others,
  };
}
