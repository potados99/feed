import React from "react";
import useFeed from "./useFeed";

type Props = {
  topic: string;
};

export default function Feed({ topic }: Props) {
  const { isLoading, isError, feed } = useFeed(topic);

  const view = (
    <ol>
      {feed.map((message) => (
        <li key={message.id}>{message.body}</li>
      ))}
    </ol>
  );

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {(isError && <div>Error!</div>) || view}
    </>
  );
}
