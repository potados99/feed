import React from "react";
import styled from "styled-components";
import PathAwaredLink from "./PathAwaredLink";
import { ThemedSkeleton } from "../../components/boilerplate";
import { TopicConsumerProps } from "../../../common/types";

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
        <ThemedSkeleton count={4} height={26} style={{ marginBottom: "8px" }} />
      )}
      {isError && <div>Error!</div>}
      {!isLoading && !isError && view}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
`;

const Topic = styled.div`
  margin-bottom: 12px;
`;
