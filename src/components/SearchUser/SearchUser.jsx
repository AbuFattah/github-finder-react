import React, { useState } from "react";
import { useGithub } from "../../context/github/GithubContext";

const SearchUser = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  const { fetchUsers, handleSearchChange, searchTerm, clearUsers, users } =
    useGithub();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm === "") return;
    fetchUsers(searchTerm);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className=" flex w-1/2">
        <input
          value={searchTerm}
          onChange={handleSearchChange}
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
