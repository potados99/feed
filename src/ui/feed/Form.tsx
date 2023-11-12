import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Message, submitMessage } from "../../data/api";
import useApi from "../../data/useApi";
import useScreenSize from "../../common/useScreenSize";

type Props = {
  visible: boolean;
  topic: string;
  message?: Message;
  onClose: () => void;
  onSubmit: () => void;
};

export default function Form({
  visible,
  topic,
  message,
  onClose,
  onSubmit,
}: Props) {
  const { isWideScreen } = useScreenSize();
  const [text, setText] = useState<string>("");

  const { isLoading, isError, invoke } = useApi(
    () => submitMessage(topic, message, text).then(onSubmit),
    [topic, message, text],
  );

  useEffect(() => {
    setText(message?.body ?? "");
  }, [topic, message]);

  return (
    <Container $visible={visible} $widthLimited={isWideScreen}>
      <ButtonBar>
        <Button onClick={onClose}>Back</Button>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error!</div>}
        <MainButton onClick={invoke}>Send</MainButton>
      </ButtonBar>
      <Divider></Divider>
      <TextArea
        placeholder={"Markdown supported!"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></TextArea>
    </Container>
  );
}

const Container = styled.div<{ $visible: boolean; $widthLimited: boolean }>`
  position: fixed;
  width: ${({ $widthLimited }) => ($widthLimited ? "600px" : "inherit")};
  margin: 0 auto;
  top: 12px;
  right: 12px;
  bottom: 12px;
  left: 12px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;

  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(-10%)"};
  visibility: ${({ $visible }) => ($visible ? "visible" : "collapse")};

  transition:
    visibility 0.3s ease-in-out,
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
`;

const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 42px;
`;

const Button = styled.button`
  padding: 6px 16px;
  background-color: transparent;
  border: none;
  height: 100%;
  font-size: 16px;
`;

const MainButton = styled.button`
  padding: 6px 16px;
  background-color: transparent;
  border: none;
  height: 100%;
  color: #07f;
  font-weight: bold;
  font-size: 16px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ddd;
`;

const TextArea = styled.textarea`
  flex: 1;
  border: none;
  margin: 12px;
  resize: none;
  outline: none;
  font-size: 16px;
`;
