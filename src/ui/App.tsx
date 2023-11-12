import Tabs from "./navigation/Tabs";
import React from "react";
import styled from "styled-components";
import SideBar from "./navigation/SideBar";
import Content from "./main/Content";
import useTopics from "./main/useTopics";
import useScreenSize from "../common/useScreenSize";

export default function App() {
  const props = useTopics();
  const { isWideScreen } = useScreenSize();

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
  width: 100%; /*아 주 중 요*/
`;
