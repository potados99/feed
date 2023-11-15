import React from "react";
import styled from "styled-components";
import FeedItem from "./FeedItem";

type Props = {
  count: number;
};

export default function FeedSkeleton({ count }: Props) {
  return (
    <Container>
      <StatusLabel>불러오는 중,,,</StatusLabel>
      {new Array(count).fill(0).map((_, i) => (
        <FeedItem
          isLoading={true}
          key={i}
          hasNext={i < count - 1}
          hasPrevious={i > 0}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
`;

const StatusLabel = styled.div`
  padding: 8px;
  margin: 14px 8px;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 16px;
  text-align: center;
`;
