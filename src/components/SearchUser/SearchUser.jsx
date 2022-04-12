import React, { useEffect, useState } from "react";
import { useGithub } from "../../context/github/GithubContext";
import Alert from "../Alert/Alert";
import { searchUsers } from "../../context/github/GithubActions";
import { Navigate } from "react-router-dom";

const SearchUser = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const { dispatch, handleSearchChange, searchTerm, clearUsers, users } =
    useGithub();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (searchTerm === "") {
      setAlert({ message: "Please enter something", type: "error" });
      return;
    }
    try {
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(searchTerm);
      dispatch({ type: "GET_USERS", payload: users });
    } catch {
      <Navigate to="/notfound" />;
    }
  };

  useEffect(() => {
    if (searchTerm === "") return;
    const timeoutId = setTimeout(async () => {
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(searchTerm);
      dispatch({ type: "GET_USERS", payload: users });
    }, 600);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <>
      <Alert alert={alert}></Alert>
      <form onSubmit={handleSubmit} className=" flex w-1/2">
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setAlert(null)}
          className="flex-1 rounded-tl-md rounded-bl-md input min-w-[200px] bg-white rounded-none text-black text-lg"
          type="text"
          placeholder="Search Users"
        />
        <button className=" flex-none btn  rounded-none rounded-tr-md rounded-br-md">
          Search
        </button>
      </form>
      {users.length > 0 && (
        <button onClick={clearUsers} className="btn mt-4">
          Clear
        </button>
      )}
    </>
  );
};

export default SearchUser;
