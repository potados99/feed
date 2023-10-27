import { Message } from "../data/api";

export type TopicConsumerProps = {
  isLoading: boolean;
  isError: boolean;
  topics: Message[];
};
