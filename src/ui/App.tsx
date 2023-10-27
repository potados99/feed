import React from "react";
import Content from "./main/Content";
import useTopics from "./main/useTopics";
import Navigation from "./main/Navigation";
import Skeleton from "react-loading-skeleton";

function App() {
  const { isLoading, isError, topics } = useTopics();

  return (
    <div>
      <Navigation isLoading={isLoading} isError={isError} topics={topics} />
      <Content isLoading={isLoading} isError={isError} topics={topics} />
    </div>
  );
}

export default App;
