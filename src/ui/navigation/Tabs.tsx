import react, { PropsWithChildren } from "react";
import { TopicConsumerProps } from "../../common/types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { InlineWrapperWithMargin } from "../../common/wrapper";
import {
  ErrorView,
  HorizontalErrorView,
  InlineSkeleton,
} from "../../common/boilerplate";

export default function Tabs({
  isLoading,
  isError,
  topics,
}: TopicConsumerProps) {
  const view = (
    <>
      {topics.map((topic) => (
        <Topic key={topic.id}>
          <Link to={`/${topic.body}`}>{topic.body}</Link>
        </Topic>
      ))}
    </>
  );

  return (
    <Container>
      {isLoading && <InlineSkeleton count={3} width={100} height={24} />}
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
  margin: 8px;
`;
