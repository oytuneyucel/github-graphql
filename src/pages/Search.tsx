import useStore from "../hooks/useStore";
import styled from "styled-components";

import { RepoItem } from "../components";

const ResultContainer = styled.div`
  margin-top: 100px;
  /* height: 100%; */
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Search = () => {
  const { results } = useStore();

  return (
    <ResultContainer>
      {results.map((repo) => {
        return <RepoItem key={repo.id} repo={repo} />;
      })}
    </ResultContainer>
  );
};
