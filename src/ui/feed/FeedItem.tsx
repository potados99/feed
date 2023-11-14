import React from "react";
import styled from "styled-components";
import Markdown from "react-markdown";
import { Message } from "../../data/api";
import { ThemedSkeleton } from "../../common/boilerplate";

type Props = {
  isLoading?: boolean;
  message?: Message;
  hasNext: boolean;
  hasPrevious: boolean;
  onEdit?: () => void;
};

export default function FeedItem({
  isLoading,
  message,
  hasNext,
  hasPrevious,
  onEdit,
}: Props) {
  return (
    <Container>
      <GraphContainer>
        <Line $visible={hasPrevious} />
        <Dot $active={!isLoading && !hasPrevious} />
        <Line $visible={hasNext} />
      </GraphContainer>
      <ContentContainer>
        <Content>
          {isLoading ? (
            <ThemedSkeleton height={32} />
          ) : (
            <StyledMarkdown>{message?.body}</StyledMarkdown>
          )}
        </Content>
        <Footer>
          {isLoading ? (
            <ThemedSkeleton width={200} />
          ) : (
            <>
              <FooterText>{message?.date}</FooterText>
              <FooterSpace>·</FooterSpace>
              <FooterText onClick={onEdit}>편집</FooterText>
            </>
          )}
        </Footer>
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
  background-color: ${({ theme }) => theme.highlight};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
`;

const Dot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.highlight};

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
  color: ${({ theme }) => theme.textPrimary};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const FooterText = styled.span`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
`;

const FooterSpace = styled(FooterText)`
  margin-left: 6px;
  margin-right: 6px;
  color: ${({ theme }) => theme.textSecondary};
`;

const StyledMarkdown = styled(Markdown)`
  margin: -12px 0; // Markdown 컴포넌트가 기본적으로 제공하는 margin을 제거합니다.

  img {
    max-width: 100%; // 이미지가 컨테이너를 넘어가지 않도록 합니다.
  }

  a {
    color: ${({ theme }) => theme.highlight};
  }
`;
