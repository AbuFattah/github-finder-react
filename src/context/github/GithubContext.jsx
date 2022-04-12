import { createContext, useContext, useEffect, useReducer } from "react";
import { Navigate } from "react-router-dom";
import githubReducer from "./githubReducer";
import { fetchJSON } from "../../utils/fetchJSON";
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
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    searchTerm: "",
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const handleSearchChange = (e) => {
    dispatch({ type: "FIELD", payload: e.target.value, name: "searchTerm" });
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        handleSearchChange,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
