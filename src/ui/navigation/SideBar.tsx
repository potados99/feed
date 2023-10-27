import React from "react";
import { Link } from "react-router-dom";
import { Message } from "../../data/api";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { TopicConsumerProps } from "../../common/types";

export default function SideBar({
  isLoading,
  isError,
  topics,
}: TopicConsumerProps) {
  const view = topics.map((topic) => (
    <Topic key={topic.id}>
      <Link to={`/${topic.body}`}>{topic.body}</Link>
    </Topic>
  ));

  return (
    <Container>
      {isLoading && <Skeleton count={4} />}
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
