import React from "react";
import styled from "styled-components";
import PathAwaredLink from "./PathAwaredLink";
import { TopicConsumerProps } from "../../common/types";
import { HorizontalErrorView, InlineSkeleton } from "../../common/boilerplate";

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
          height={29}
          style={{ marginTop: "12px", marginLeft: "12px" }}
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
`;

const Topic = styled.div`
  display: inline-block;
  margin: 8px 4px;
`;
