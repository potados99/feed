import React from "react";
import styled from "styled-components";
import useScreenSize from "../../common/useScreenSize";
import useMessageEdit from "./useMessageEdit";
import useTextAreaModal from "./useTextAreaModal";
import { IoIosArrowBack } from "react-icons/io";
import { feedEventChannel } from "../../common/eventChannels";
import { useNavigate, useParams } from "react-router-dom";

export default function Form() {
  const { isWideScreen } = useScreenSize();
  const { topic, messageId } = useParams();
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  const onSubmit = () => {
    feedEventChannel.emit("onInvalidate");
    navigate(-1);
  };

  const { isLoading, isError, text, setText, submit } = useMessageEdit(
    topic!!,
    messageId,
    onSubmit,
  );

  const { visible, textAreaRef } = useTextAreaModal();

  return (
    <>
      <BackdropOverlay $visible={visible && isWideScreen} onClick={onClose} />
      <Container $visible={visible} $widthLimited={isWideScreen}>
        <ButtonBar>
          <LeftButton onClick={onClose}>
            <IoIosArrowBack size={28} />
          </LeftButton>
          {isLoading && <div>로드 중...</div>}
          {isError && <div>문제 발생!</div>}
          {!isLoading && !isError && (
            <TitleLabel>{messageId ? "편집" : "작성"}</TitleLabel>
          )}
          <MainButton onClick={submit}>완료</MainButton>
        </ButtonBar>
        <Divider></Divider>
        <TextArea
          ref={textAreaRef}
          $widthLimited={isWideScreen}
          placeholder={(!isLoading && !isError && "마크다운 지원됨!") || ""}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></TextArea>
      </Container>
    </>
  );
}

const Container = styled.div<{ $visible: boolean; $widthLimited: boolean }>`
  z-index: 1000;
  position: fixed;
  width: ${({ $widthLimited }) => ($widthLimited ? "600px" : "inherit")};
  height: ${({ $widthLimited }) => ($widthLimited ? "400px" : "100%")};
  margin: ${({ $widthLimited }) => ($widthLimited ? "auto auto" : "0 auto")};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;

  background-color: ${({ $widthLimited, theme }) =>
    $widthLimited ? theme.modal : theme.background};
  border-radius: ${({ $widthLimited }) => ($widthLimited ? "12px" : "0")};
  box-shadow: ${({ $widthLimited }) =>
    $widthLimited ? "0 0 10px 0 rgba(0, 0, 0, 0.2)" : "none"};

  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(+100%)"};
  visibility: ${({ $visible }) => ($visible ? "visible" : "collapse")};

  transition:
    visibility 0.2s ease-in-out,
    transform 0.2s ease-in-out;
`;

const BackdropOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: ${({ theme }) => theme.overlay};

  visibility: ${({ $visible }) => ($visible ? "visible" : "collapse")};
  opacity: ${({ $visible }) => ($visible ? 0.8 : 0)};

  transition:
    visibility 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
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
  color: ${({ theme }) => theme.textPrimary};
`;

const TitleLabel = styled.span`
  color: ${({ theme }) => theme.textPrimary};
`;

const MainButton = styled.button`
  padding: 6px 16px;
  background-color: transparent;
  border: none;
  height: 100%;
  color: ${({ theme }) => theme.highlight};
  font-weight: bold;
  font-size: 16px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.border};
`;

const TextArea = styled.textarea<{ $widthLimited: boolean }>`
  flex: 1;
  border: none;
  margin: 12px;
  resize: none;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ $widthLimited, theme }) =>
    $widthLimited ? theme.modal : theme.background};
`;
