import useApiData from "../../data/useApiData";
import { getMessage } from "../../data/api";

export default function useMessage(topic: string, messageId?: string) {
  const { data, ...others } = useApiData(
    () => getMessage(topic, messageId),
    undefined,
    [topic /*토픽이 바뀌면 새로 로드해야 해요*/],
  );

  return {
    message: data,
    ...others,
  };
}
