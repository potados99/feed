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
  const view = (
    <div>
      {topics.map((topic) => (
        <Topic key={topic.id}>
          <Link to={`/${topic.body}`}>{topic.body}</Link>
        </Topic>
      ))}
    </div>
  );

  return (
    <>
      {isLoading && <Skeleton count={4} />}
      {isError && <div>Error!</div>}
      {!isLoading && !isError && view}
    </>
  );
}

const Topic = styled.div`
  margin-top: 8px;
`;
