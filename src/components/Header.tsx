import { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import useStore from "../hooks/useStore";
import { useInput } from "../hooks/useInput";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.main.darkBlue};
  padding: 0 8.75rem;
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100%);
  z-index: 99;
  box-sizing: border-box;
  transition: width 0.4s;
  transition-timing-function: ease-in-out;
  object-fit: contain;
  box-shadow: 0 1.5px 21.5px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  height: 5.625rem;

  p {
    color: white;
  }
`;

// @ts-ignore
const SignOut = styled.h2`
  color: ${(props) => props.theme.main.bluePurple};
  font-size: 0.875rem;
  line-height: 1.3125rem;
  text-decoration: none;
  cursor: pointer;

  &:active,
  &:visited,
  &:focus {
    color: ${(props) => props.theme.main.bluePurple};
  }
`;

export const Header = () => {
  const history = useHistory();
  const { user, clearStore, search } = useStore();
  const [query, searchInput] = useInput({ width: "100%" }, true);

  const signOut = () => {
    clearStore();
    history.push("/login");
  };

  useEffect(() => {
    if (query.length) {
      search(query);
    }
  }, [search, query]);

  return (
    <Container>
      <h2>{user}</h2>
      {searchInput}
      <SignOut onClick={signOut}>Sign Out</SignOut>
    </Container>
  );
};
