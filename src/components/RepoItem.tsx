import useStore from "../hooks/useStore";
import styled from "styled-components";

const ResultCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  background-color: white;
  min-height: 4rem;
  padding: 1rem;
  box-shadow: 5px 8px;
`;

const DescriptionPanel = styled.div`
  display: flex;
  width: 7rem;
  overflow: hidden;

  flex-direction: column;
  flex: 1;
`;

const ActionPanel = styled.div`
  width: 7rem;
  margin-left: 100px;
  text-align: left;
`;

const RepoLink = styled.a`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${(props) => props.theme.main.algaeGreen};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RepoItem = ({ repo }: any) => {
  const { changeStar, changeFollow } = useStore();

  const onStarClicked = (starred: boolean) =>
    changeStar(repo.id, starred ? "remove" : "add");

  const onFollowClicked = (subscribed: boolean) =>
    changeFollow(repo.id, subscribed ? "UNSUBSCRIBED" : "SUBSCRIBED");

  return (
    <ResultCard>
      <DescriptionPanel>
        <RepoLink href={repo.url} rel="noreferrer" target="_blank">
          {repo.name}
        </RepoLink>
        <div dangerouslySetInnerHTML={{ __html: repo.shortDescriptionHTML }} />
      </DescriptionPanel>
      <ActionPanel>
        <div onClick={() => onStarClicked(repo.viewerHasStarred)}>
          {repo.viewerHasStarred ? "Unstar" : "Star"}{" "}
          {repo.stargazers.totalCount}
        </div>
        <div
          onClick={() =>
            onFollowClicked(repo.viewerSubscription === "SUBSCRIBED")
          }
        >
          {repo.viewerSubscription === "SUBSCRIBED" ? "Unfollow" : "Follow"}{" "}
          {repo.watchers.totalCount}
        </div>
      </ActionPanel>
    </ResultCard>
  );
};
