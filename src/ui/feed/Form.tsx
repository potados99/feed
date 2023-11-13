import useApi from "../../data/useApi";
import styled from "styled-components";
import useScreenSize from "../../common/useScreenSize";
import { IoIosArrowBack } from "react-icons/io";
import { Message, submitMessage } from "../../data/api";
import React, { useEffect, useState } from "react";

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
        <LeftButton onClick={onClose}>
          <IoIosArrowBack size={28} />
        </LeftButton>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error!</div>}
        {!isLoading && !isError && (message ? "편집" : "작성")}
        <MainButton onClick={invoke}>완료</MainButton>
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
  margin: ${({ $widthLimited }) => ($widthLimited ? "12px auto" : "0 auto")};
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;

  background-color: white;
  border-radius: ${({ $widthLimited }) => ($widthLimited ? "12px" : "0")};
  box-shadow: ${({ $widthLimited }) =>
    $widthLimited ? "0 0 10px 0 rgba(0, 0, 0, 0.2)" : "none"};

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(+5%)"};
  visibility: ${({ $visible }) => ($visible ? "visible" : "collapse")};

  transition:
    visibility 0.2s ease-in-out,
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out;
`;

const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 42px;
`;

const LeftButton = styled.button`
  padding: 6px 16px 6px 8px;
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
