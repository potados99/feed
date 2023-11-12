import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { editMessage, postMessage, Message } from "../../data/api";
import useScreenSize from "../../common/useScreenSize";

type Props = {
  topic: string;
  message?: Message;
  onClose: () => void;
  onSubmit: () => void;
};

export default function Form({ topic, message, onClose, onSubmit }: Props) {
  const { width } = useScreenSize();
  const [text, setText] = useState<string>("");

  const isWideScreen = width > 768;

  const send = async () => {
    if (message) {
      await editMessage(topic, message.id, text);
    } else {
      await postMessage(topic, text);
    }

    onSubmit();
  };

  useEffect(() => {
    setText(message?.body ?? "");
  }, [topic, message]);

  return (
    <Container $widthLimited={isWideScreen}>
      <ButtonBar>
        <Button onClick={onClose}>Back</Button>
        <MainButton onClick={send}>Send</MainButton>
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

const Container = styled.div<{ $widthLimited: boolean }>`
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
`;

const MainButton = styled.button`
  padding: 6px 16px;
  background-color: transparent;
  border: none;
  height: 100%;
  color: #07f;
  font-weight: bold;
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
`;
