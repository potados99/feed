import React from "react";
import { Link } from "react-router-dom";
import { Message } from "../../data/api";

type Props = {
  topics: Message[];
};

export default function Tabs({ topics }: Props) {
  return (
    <div>
      {topics.map((topic) => (
        <div key={topic.id}>
          <Link to={`/${topic.body}`}>{topic.body}</Link>
        </div>
      ))}
    </div>
  );
}
