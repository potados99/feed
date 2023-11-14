import React from "react";
import styled from "styled-components";
import PathAwaredLink from "./PathAwaredLink";
import { TopicConsumerProps } from "../../../common/types";
import {
  HorizontalErrorView,
  InlineSkeleton,
} from "../../components/boilerplate";

export default function Tabs({
  isLoading,
  isError,
  topics,
}: TopicConsumerProps) {
  const view = (
    <>
      {topics.map((topic) => (
        <Topic key={topic.id}>
          <PathAwaredLink to={`/${topic.body}`}>{topic.body}</PathAwaredLink>
        </Topic>
      ))}
    </>
  );

  return (
    <Container>
      {isLoading && (
        <InlineSkeleton
          count={3}
          width={100}
          height={28}
          style={{ marginTop: "8px", marginLeft: "12px", marginBottom: "8px" }}
        />
      )}
      {isError && <HorizontalErrorView />}
      {!isLoading && !isError && view}
    </Container>
  );
}

const Container = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }

  background: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  position: sticky;
  top: 0;
`;

const Topic = styled.div`
  display: inline-block;
  margin: 8px 4px;
`;
