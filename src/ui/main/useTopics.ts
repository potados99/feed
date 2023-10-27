import useApi from "../../data/useApi";
import { getTopics } from "../../data/api";

export default function useTopics() {
  const { data, ...others } = useApi(getTopics, [], []);
  return {
    topics: data,
    ...others,
  };
}
