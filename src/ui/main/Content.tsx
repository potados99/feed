import Feed from "../feed/Feed";
import React from "react";
import styled from "styled-components";
import FeedSkeleton from "../feed/FeedSkeleton";
import { ErrorView } from "../../common/boilerplate";
import { TopicConsumerProps } from "../../common/types";
import { Navigate, Route, Routes } from "react-router-dom";

export default function Content({
  isLoading,
  isError,
  topics,
}: TopicConsumerProps) {
  const view = (
    <Routes>
      <Route path="/" element={<Navigate to={topics[0]?.body} />} />
      {topics.map((topic) => (
        <Route
          path={`/${topic.body}`}
          element={<Feed topic={topic.body} />}
          key={topic.id}
        />
      ))}
    </Routes>
  );

  return (
    <Container>
      {isLoading && <FeedSkeleton count={5} />}
      {isError && <ErrorView />}
      {!isLoading && !isError && view}
    </Container>
  );
}

const Container = styled.div`
  margin-left: 12px;
  margin-right: 12px;
`;
