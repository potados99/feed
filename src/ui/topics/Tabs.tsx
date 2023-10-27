import React from "react";
import { Link } from "react-router-dom";
import { Message } from "../../data/api";
import styled from "styled-components";

type Props = {
  topics: Message[];
};

export default function Tabs({ topics }: Props) {
  return (
    <div>
      {topics.map((topic) => (
        <Topic key={topic.id}>
          <Link to={`/${topic.body}`}>{topic.body}</Link>
        </Topic>
      ))}
    </div>
  );
}

const Topic = styled.div`
  margin-top: 8px;
`;
