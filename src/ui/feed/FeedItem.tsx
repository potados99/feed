import React from "react";
import styled from "styled-components";
import { Message } from "../../data/api";

type Props = {
  message: Message;
  hasNext: boolean;
  hasPrevious: boolean;
};

export default function FeedItem({ message, hasNext, hasPrevious }: Props) {
  return (
    <Container onClick={() => alert(JSON.stringify(message))}>
      <GraphContainer>
        <Line visible={hasPrevious} />
        <Dot />
        <Line visible={hasNext} />
      </GraphContainer>
      <ContentContainer>
        <BodyText>{message.body}</BodyText>
        <DateText>{message.date}</DateText>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
`;

const GraphContainer = styled.div`
  width: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div<{ visible: boolean }>`
  flex: 1;
  width: 2px;
  background-color: #07f;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #07f;
`;

const ContentContainer = styled.div`
  flex: 1;
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const BodyText = styled.span``;

const DateText = styled.span`
  margin-top: 4px;
  font-size: 12px;
  color: #456;
`;
