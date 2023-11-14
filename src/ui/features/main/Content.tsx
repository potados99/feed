import Feed from "../feed/Feed";
import Form from "../form/Form";
import React from "react";
import styled from "styled-components";
import FeedSkeleton from "../feed/FeedSkeleton";
import { ErrorView } from "../../components/boilerplate";
import { TopicConsumerProps } from "../../../common/types";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

export default function Content({
  isLoading,
  isError,
  topics,
}: TopicConsumerProps) {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  const view = (
    <>
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Navigate to={topics[0]?.body} />} />
        {topics.map((topic) => (
          <Route
            path={`/${topic.body}`}
            element={<Feed topic={topic.body} />}
            key={topic.id}
          />
        ))}
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/:topic/new" element={<Form />} />
          <Route path="/:topic/edit/:messageId" element={<Form />} />
        </Routes>
      )}
    </>
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
