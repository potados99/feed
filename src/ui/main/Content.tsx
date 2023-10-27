import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "../feed/Feed";
import Skeleton from "react-loading-skeleton";
import { TopicConsumerProps } from "../../common/types";
import { ErrorView } from "../../common/boilerplate";
import FeedSkeleton from "../feed/FeedSkeleton";

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
    <>
      {isLoading && <FeedSkeleton count={5} />}
      {isError && <ErrorView />}
      {!isLoading && !isError && view}
    </>
  );
}
