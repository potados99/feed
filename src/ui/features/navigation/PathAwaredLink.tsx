import styled from "styled-components";
import React, { PropsWithChildren } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";

type Props = {
  to: string;
} & PropsWithChildren;

export default function PathAwaredLink({ to, children }: Props) {
  const { pathname } = useLocation(); // 요 친구는 이미 url encoding이 되어있는 상태로 반환됩니다. "SeongYeol's%20Lovely%20Space" 이런 식이에요. 그래서 decodeURI를 해줘야 합니다.
  const nowIn = !!matchPath(`${to}/*`, decodeURI(pathname));

  return (
    <Container>
      <Link to={to}>
        <Content $active={nowIn}>{children}</Content>
      </Link>
    </Container>
  );
}

const Content = styled.div<{ $active: boolean }>`
  padding: 1px 10px 4px 10px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 30px;

  color: ${({ $active, theme }) =>
    $active ? theme.background : theme.highlight};
  background: ${({ $active, theme }) =>
    $active ? theme.highlightArea : "transparent"};
`;

const Container = styled.div`
  a {
    text-decoration: none;
  }
`;
