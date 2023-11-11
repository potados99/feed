import React, { PropsWithChildren } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import styled from "styled-components";

type Props = {
  to: string;
} & PropsWithChildren;

export default function PathAwaredLink({ to, children }: Props) {
  const location = useLocation();

  const nowIn = !!matchPath(location.pathname, to);

  return (
    <Container>
      <Link to={to}>
        <Content $active={nowIn}>{children}</Content>
      </Link>
    </Container>
  );
}

const Content = styled.div<{ $active: boolean }>`
  padding: 1px 10px 5px 10px;
  text-align: center;
  border: 1px solid #e8e8e8;
  border-radius: 30px;

  color: ${({ $active }) => ($active ? "#fff" : "#07f")};
  background: ${({ $active }) => ($active ? "#07f" : "transparent")};
`;

const Container = styled.div`
  a {
    text-decoration: none;
  }
`;
