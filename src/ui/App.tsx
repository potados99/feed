import Feed from "./feed/Feed";
import Tabs from "./topics/Tabs";
import React from "react";
import useTopics from "./topics/useTopics";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  const { isLoading, isError, topics } = useTopics();

  const view = (
    <div>
      <Tabs topics={topics} />
      <Routes>
        <Route path="/" element={<Navigate to={topics[0]?.body} />} />
        {topics.map((topic) => (
          <Route
            path={`/${topic.body}`}
            element={<Feed topic={topic.body} />}
            key={topic.id}
          />
        ))}
      </Routes>
    </div>
  );

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error!</div>}
      {!isLoading && !isError && view}
    </>
  );
}

export default App;
