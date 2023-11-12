import React, { useState } from "react";
import useFeed from "./useFeed";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import FeedItem from "./FeedItem";
import FeedSkeleton from "./FeedSkeleton";
import { ErrorView } from "../../common/boilerplate";
import Form from "./Form";
import { Message } from "../../data/api";

type Props = {
  topic: string;
};

export default function Feed({ topic }: Props) {
  const { isLoading, isError, feed, reload } = useFeed(topic);
  const [popupVisible, setPopupVisible] = useState(false);
  const [messageInEdit, setMessageInEdit] = useState<Message>();

  const view = (
    <Container>
      <NewButton
        onClick={() => {
          setMessageInEdit(undefined);
          setPopupVisible(true);
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
          onClick={() => {
            setMessageInEdit(message);
            setPopupVisible(true);
          }}
        />
      ))}
      {popupVisible && (
        <Form
          topic={topic}
          message={messageInEdit}
          onClose={() => setPopupVisible(false)}
          onSubmit={() => {
            reload();
            setPopupVisible(false);
          }}
        />
      )}
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