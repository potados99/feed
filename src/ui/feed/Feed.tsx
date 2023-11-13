import styled from "styled-components";
import useFeed from "./useFeed";
import FeedItem from "./FeedItem";
import FeedSkeleton from "./FeedSkeleton";
import { ErrorView } from "../../common/boilerplate";
import React, { useEffect } from "react";
import { feedEventChannel } from "../../common/eventChannels";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  topic: string;
};

export default function Feed({ topic }: Props) {
  const { isLoading, isError, feed, reload } = useFeed(topic);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = feedEventChannel.on("onInvalidate", reload);

    return () => {
      unsubscribe();
    };
  }, [topic, reload]);

  const view = (
    <Container>
      <NewButton
        onClick={() => {
          navigate(`/${topic}/new`, { state: { previousLocation: location } });
        }}
      >
        무슨 생각을 하고 있나요?
      </NewButton>
      {feed.map((message, i) => (
        <FeedItem
          key={message.id}
          message={message}
          hasNext={i < feed.length - 1}
          hasPrevious={i > 0}
          onEdit={() => {
            navigate(`/${topic}/edit/${message.id}`, {
              state: { previousLocation: location },
            });
          }}
        />
      ))}
    </Container>
  );

  return (
    <>
      {isLoading && <FeedSkeleton count={5} />}
      {isError && <ErrorView />}
      {!isLoading && !isError && view}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
`;

const NewButton = styled.button`
  padding-top: 14px;
  background-color: transparent;
  border: none;
  color: #07f;
  font-size: 16px;
`;
