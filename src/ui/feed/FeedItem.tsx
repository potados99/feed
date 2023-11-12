import React from "react";
import styled from "styled-components";
import { Message } from "../../data/api";
import Skeleton from "react-loading-skeleton";
import Markdown from "react-markdown";

type Props = {
  isLoading?: boolean;
  message?: Message;
  hasNext: boolean;
  hasPrevious: boolean;
  onClick?: () => void;
};

export default function FeedItem({
  isLoading,
  message,
  hasNext,
  hasPrevious,
  onClick,
}: Props) {
  return (
    <Container onClick={onClick}>
      <GraphContainer>
        <Line $visible={hasPrevious} />
        <Dot $active={!isLoading && !hasPrevious} />
        <Line $visible={hasNext} />
      </GraphContainer>
      <ContentContainer>
        <Content>
          {isLoading ? (
            <Skeleton height={32} />
          ) : (
            <StyledMarkdown>{message?.body}</StyledMarkdown>
          )}
        </Content>
        <DateText>{isLoading ? <Skeleton /> : message?.date}</DateText>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch; /*이게 있어야 선이 위아래로 확장돼요*/
`;

const GraphContainer = styled.div`
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div<{ $visible: boolean }>`
  flex: 1;
  width: 2px;
  background-color: #07f;
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
`;

const Dot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #07f;

  animation: ${({ $active }) =>
    $active ? "pulse-animation 2s infinite" : "none"};
`;

const ContentContainer = styled.div`
  flex: 1;
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
`;

const Content = styled.div`
  flex: 1;
  word-break: break-word;
`;

const DateText = styled.span`
  margin-top: 4px;
  font-size: 12px;
  color: #456;
`;

const StyledMarkdown = styled(Markdown)`
  margin: -12px 0; // Markdown 컴포넌트가 기본적으로 제공하는 margin을 제거합니다.

  img {
    max-width: 100%; // 이미지가 컨테이너를 넘어가지 않도록 합니다.
  }
`;
