import { getFeed } from "./api";
import useApi from "./useApi";

export default function useFeed(topic: string) {
  const { data, ...others } = useApi(
    () => getFeed(topic),
    [],
    [topic /*토픽이 바뀌면 새로 로드해야 해요*/],
  );
  return {
    feed: data.sort((a, b) => b.timestamp - a.timestamp),
    ...others,
  };
}
