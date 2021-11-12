import styled from "styled-components";

import { Header } from "../components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  height: 100%;
  transition: margin-left 0.4s;
  transition-timing-function: ease-in-out;
`;

interface Props {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
};
