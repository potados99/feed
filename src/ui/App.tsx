import Tabs from "./features/navigation/Tabs";
import React from "react";
import styled from "styled-components";
import SideBar from "./features/navigation/SideBar";
import Content from "./features/main/Content";
import useTopics from "./features/main/useTopics";
import useScreenSize from "../common/hooks/useScreenSize";

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
  height: 100vh;
  margin-right: 12px;
  position: sticky;
  top: 0;
`;

const ContentArea = styled.div`
  width: 100%; /*아 주 중 요*/
`;
