import React from "react";
import Tabs from "./Tabs";
import Feed from "./Feed";
import useTopics from "./useTopics";
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
      {(isError && <div>Error!</div>) || view}
    </>
  );
}

export default App;
