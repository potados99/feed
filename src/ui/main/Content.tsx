import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "../feed/Feed";
import { Message } from "../../data/api";
import Skeleton from "react-loading-skeleton";

type Props = {
  isLoading: boolean;
  isError: boolean;
  topics: Message[];
};

export default function Content({ isLoading, isError, topics }: Props) {
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
      {isLoading && <Skeleton count={10} />}
      {isError && <div>Error!</div>}
      {!isLoading && !isError && view}
    </>
  );
}
