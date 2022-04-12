import React, { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import SearchUser from "../components/SearchUser/SearchUser";
import UserList from "../components/Users/UserList";
import { useGithub } from "../context/github/GithubContext";

const Home = () => {
  const { loading, users } = useGithub();
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const fetchUsers = async (userName) => {
  //   const params = new URLSearchParams({ q: userName });
  //   setLoading(true);
  //   const res = await fetch(`https://api.github.com/search/users?${params}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `token ${import.meta.env.VITE_TOKEN}`,
  //     },
  //   });
  //   const { items } = await res.json();
  //   setUsers(items);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   if (searchTerm === "") return;
  //   const timeoutId = setTimeout(fetchUsers, 600);
  //   return () => clearTimeout(timeoutId);
  // }, [searchTerm]);

  return (
    <div className="container mx-auto px-4">
      <SearchUser />
      {loading ? <Loading /> : <UserList users={users} />}
    </div>
  );
};

export default Home;
