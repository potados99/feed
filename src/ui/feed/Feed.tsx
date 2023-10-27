import React from "react";
import useFeed from "./useFeed";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

type Props = {
  topic: string;
};

export default function Feed({ topic }: Props) {
  const { isLoading, isError, feed } = useFeed(topic);

  const view = (
    <ol>
      {feed.map((message) => (
        <Message
          key={message.id}
          onClick={() => alert(JSON.stringify(message))}
        >
          {message.body}
        </Message>
      ))}
    </ol>
  );

  return (
    <>
      {isLoading && <Skeleton count={10} />}
      {isError && <div>Error!</div>}
      {!isLoading && !isError && view}
    </>
  );
}

const Message = styled.li`
  margin-top: 16px;
`;
