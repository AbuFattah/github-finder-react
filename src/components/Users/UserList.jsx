import React from "react";
import { useGithub } from "../../context/github/GithubContext";
import UserItem from "./UserItem";

const UserList = ({ users }) => {
  return (
    <>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5  min-h-[500px]">
        {users.map((user) => (
          <UserItem key={user.id} user={user}></UserItem>
        ))}
      </div>
    </>
  );
};

export default UserList;
