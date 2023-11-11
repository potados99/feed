import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { TopicConsumerProps } from "../../common/types";
import PathAwaredLink from "./PathAwaredLink";

export default function SideBar({
  isLoading,
  isError,
  topics,
}: TopicConsumerProps) {
  const view = topics.map((topic) => (
    <Topic key={topic.id}>
      <PathAwaredLink to={`/${topic.body}`}>{topic.body}</PathAwaredLink>
    </Topic>
  ));

  return (
    <Container>
      {isLoading && (
        <Skeleton count={4} height={26} style={{ marginBottom: "8px" }} />
      )}
      {isError && <div>Error!</div>}
      {!isLoading && !isError && view}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 12px;
`;

const Topic = styled.div`
  margin-bottom: 8px;
`;
