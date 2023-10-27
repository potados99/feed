import React from "react";
import Content from "./main/Content";
import useTopics from "./main/useTopics";
import Tabs from "./navigation/Tabs";
import SideBar from "./navigation/SideBar";
import useScreenSize from "../common/useScreenSize";
import styled from "styled-components";

export default function App() {
  const props = useTopics();
  const { width } = useScreenSize();

  const isWideScreen = width > 768;
  const needSidebar = isWideScreen;
  const needTabs = !isWideScreen;

  return (
    <Container>
      {needSidebar && (
        <SideArea>
          <SideBar {...props} />
        </SideArea>
      )}
      <ContentArea>
        {needTabs && <Tabs {...props} />}
        <Content {...props} />
      </ContentArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SideArea = styled.div`
  width: 120px;
  margin-right: 12px;
`;

const ContentArea = styled.div`
  flex: 1;
  margin-left: 12px;
  margin-right: 12px;
`;
