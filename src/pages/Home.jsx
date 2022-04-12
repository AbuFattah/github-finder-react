import React, { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import SearchUser from "../components/SearchUser/SearchUser";
import UserList from "../components/Users/UserList";
import { useGithub } from "../context/github/GithubContext";

const Home = () => {
  const { loading, users } = useGithub();

  return (
    <div className="container mx-auto px-4">
      <SearchUser />
      {loading ? <Loading /> : <UserList users={users} />}
    </div>
  );
};

export default Home;
