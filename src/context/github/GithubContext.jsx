import { createContext, useContext, useEffect, useReducer } from "react";
import { Navigate } from "react-router-dom";
import githubReducer from "./githubReducer";
const GithubContext = createContext({
  searchTerm: "",
  users: [],
  user: {},
  repos: [],
  loading: false,
  fetchUsers: () => {},
  handleSearchChange: () => {},
  clearUsers: () => {},
});

export const useGithub = () => {
  const gitContext = useContext(GithubContext);

  return gitContext;
};

export const GithubProvider = ({ children }) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `token ${import.meta.env.VITE_TOKEN}`,
    },
  };
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    searchTerm: "",
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (userName) => {
    const params = new URLSearchParams({ q: userName });

    try {
      setLoading();
      const res = await fetch(
        `https://api.github.com/search/users?${params}`,
        requestOptions
      );

      const { items } = await res.json();

      dispatch({
        type: "GET_USERS",
        payload: items,
      });
    } catch {
      console.log("something went wrong");
    }
  };

  const getUser = async (userName) => {
    try {
      setLoading();
      const res = await fetch(
        `https://api.github.com/users/${userName}`,
        requestOptions
      );

      if (!res.ok) {
        <Navigate to="/notfound"></Navigate>;
        return;
      }

      const repoResponse = await fetch(
        `https://api.github.com/users/${userName}/repos?per_page=10&sort=created_at`,
        requestOptions
      );

      if (!repoResponse.ok) {
        <Navigate to="/notfound"></Navigate>;
        return;
      }
      const user = await res.json();
      const repos = await repoResponse.json();
      if (user)
        dispatch({
          type: "GET_USER",
          payload: user,
        });
      if (repos) {
        dispatch({ type: "GET_REPOS", payload: repos });
      }
    } catch {
      console.log("something went wrong");
    }
  };

  const clearUsers = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleSearchChange = (e) => {
    dispatch({ type: "FIELD", payload: e.target.value, name: "searchTerm" });
  };

  function setLoading() {
    dispatch({ type: "SET_LOADING" });
  }

  // useEffect(() => {
  //   if (state.searchTerm === "") return;
  //   const timeoutId = setTimeout(searchUsers.bind(null, state.searchTerm), 600);
  //   return () => clearTimeout(timeoutId);
  // }, [state.searchTerm]);

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        getUser,
        handleSearchChange,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
