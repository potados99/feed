import styled from "styled-components";
import useFeed from "./useFeed";
import FeedItem from "./FeedItem";
import FeedSkeleton from "./FeedSkeleton";
import { ErrorView } from "../../components/boilerplate";
import React, { useEffect } from "react";
import { feedEventChannel } from "../../../common/events/eventChannels";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
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
        <ButtonText>무슨 생각을 하고 있나요?</ButtonText>
        <BsPencilSquare />
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin: 14px 10px 20px 10px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.highlight};
  border-radius: 8px;
  color: ${({ theme }) => theme.highlight};
  font-size: 16px;
`;

const ButtonText = styled.span`
  margin: 0 6px;
`;
