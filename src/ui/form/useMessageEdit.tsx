import useApi from "../../data/useApi";
import useMessage from "./useMessage";
import { submitMessage } from "../../data/api";
import { useEffect, useState } from "react";

export default function useMessageEdit(
  topic: string,
  messageId: string | undefined,
  afterSubmit: () => void,
) {
  const {
    isLoading: isMessageLoading,
    isError: isMessageError,
    message,
  } = useMessage(topic, messageId);

  const [text, setText] = useState("");

  const {
    isLoading: isSubmitLoading,
    isError: isSubmitError,
    invoke: submit,
  } = useApi(
    () => submitMessage(topic!!, messageId, text).then(afterSubmit),
    [topic, messageId, text],
  );

  useEffect(() => {
    if (message) {
      setText(message.body);
    }
  }, [message]);

  return {
    isLoading: isMessageLoading || isSubmitLoading,
    isError: isMessageError || isSubmitError,
    text,
    setText,
    submit,
  };
}
