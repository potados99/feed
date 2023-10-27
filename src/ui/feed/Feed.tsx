import React from "react";
import useFeed from "./useFeed";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import FeedItem from "./FeedItem";
import FeedSkeleton from "./FeedSkeleton";
import { ErrorView } from "../../common/boilerplate";

type Props = {
  topic: string;
};

export default function Feed({ topic }: Props) {
  const { isLoading, isError, feed } = useFeed(topic);

  const view = (
    <div>
      {feed.map((message, i) => (
        <FeedItem
          key={message.id}
          message={message}
          hasNext={i < feed.length - 1}
          hasPrevious={i > 0}
        />
      ))}
    </div>
  );

  return (
    <>
      {isLoading && <FeedSkeleton count={5} />}
      {isError && <ErrorView />}
      {!isLoading && !isError && view}
    </>
  );
}
