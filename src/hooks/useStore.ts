import create, { State } from "zustand";
import { configurePersist } from "zustand-persist";
import { graphql } from "@octokit/graphql";
import { graphql as gql } from "@octokit/graphql/dist-types/types";

const { persist } = configurePersist({
  storage: localStorage
});

interface Store extends State {
  user: string | null;
  token: string | null;
  results: any[];
  graphql: gql;
  isAuthenticated: false;
  setUser: (user: any) => void;
  login: (token: string) => Promise<any>;
  search: (query: string) => Promise<void>;
  changeStar: (id: string, action: "add" | "remove") => Promise<void>;
  changeFollow: (
    id: string,
    action: "SUBSCRIBED" | "UNSUBSCRIBED"
  ) => Promise<void>;
  clearStore: () => void;
}

const useStore = create<Store>(
  persist(
    {
      key: "state",
      allowlist: ["user", "token", "isAuthenticated"]
    },
    (set: any, get) => ({
      user: null,
      token: null,
      results: [],
      graphql,
      isAuthenticated: false,
      login: async (token) => {
        set({ isAuthenticating: true });
        const { viewer } = await get().graphql(
          `{ 
            viewer {
              login
            } 
          }`,
          {
            headers: {
              authorization: `token ${token}`
            }
          }
        );
        set((state: any) => ({
          ...state,
          isAuthenticated: true,
          user: viewer.login,
          token
        }));

        return viewer.login;
      },
      search: async (query) => {
        try {
          const { search } = await get().graphql(
            `{
            search(query: "${query} sort:stars", type: REPOSITORY, first: 10) {
              repositoryCount
              edges {
                node {
                  ... on Repository {
                    id
                    name
                    url
                    shortDescriptionHTML
                    viewerHasStarred
                    viewerSubscription
                    watchers {
                      totalCount
                    }
                    stargazers {
                      totalCount
                    }
                    forks {
                      totalCount
                    }
                    updatedAt
                  }
                }
              }
            }
          }`,
            {
              headers: {
                authorization: `token ${get().token}`
              }
            }
          );
          set((state: any) => ({
            ...state,
            results: search.edges.map((e) => e.node)
          }));
        } catch (e) {
          console.log(e);
        }
      },

      changeStar: async (id, action) => {
        const {
          [`${action}Star`]: { starrable }
        }: any = await get().graphql(
          `mutation ${action}Star {
          ${action}Star(input:{
            starrableId: "${id}"
          }){
            starrable {
              viewerHasStarred
              stargazers {
                totalCount
              }
            }
          }
        }`,
          {
            headers: {
              authorization: `token ${get().token}`
            }
          }
        );
        set((state: any) => ({
          ...state,
          results: get().results.map((node) =>
            node.id === id
              ? {
                  ...node,
                  viewerHasStarred: starrable.viewerHasStarred,
                  stargazers: { totalCount: starrable.stargazers.totalCount }
                }
              : node
          )
        }));
      },
      changeFollow: async (id, action) => {
        const {
          updateSubscription: { subscribable }
        } = await get().graphql(
          `mutation updateSubscription{ updateSubscription(input:{
            subscribableId: "MDEwOlJlcG9zaXRvcnk0MzQzODc4NA==",
            state:${action}
          }){
            subscribable {
              viewerSubscription
            }
          }}`,
          {
            headers: {
              authorization: `token ${get().token}`
            }
          }
        );
        set((state: any) => ({
          ...state,
          results: get().results.map((node) =>
            node.id === id
              ? {
                  ...node,
                  viewerSubscription: subscribable.viewerSubscription
                }
              : node
          )
        }));
      },
      setUser: (user: any) => set(() => ({ user })),
      clearStore: () =>
        set(() => ({
          user: null,
          token: null,
          isAuthenticated: false
        }))
    })
  )
);

export default useStore;
