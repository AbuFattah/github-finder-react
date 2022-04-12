import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import githubReducer from "./githubReducer";
const GithubContext = createContext({
  searchTerm: "",
  users: [],
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
    loading: false,
    searchTerm: "",
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const fetchUsers = async (userName) => {
    const params = new URLSearchParams({ q: userName });
    const setLoading = () => {
      dispatch({ type: "SET_LOADING" });
    };

    try {
      setLoading();
      const res = await fetch(`https://api.github.com/search/users?${params}`, {
        method: "GET",
        headers: {
          Authorization: `token ${import.meta.env.VITE_TOKEN}`,
        },
      });
      const { items } = await res.json();

      dispatch({
        type: "GET_USERS",
        payload: items,
      });
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

  useEffect(() => {
    if (state.searchTerm === "") return;
    const timeoutId = setTimeout(fetchUsers.bind(null, state.searchTerm), 600);
    return () => clearTimeout(timeoutId);
  }, [state.searchTerm]);

  return (
    <GithubContext.Provider
      value={{
        searchTerm: state.searchTerm,
        users: state.users,
        loading: state.loading,
        fetchUsers,
        handleSearchChange,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
