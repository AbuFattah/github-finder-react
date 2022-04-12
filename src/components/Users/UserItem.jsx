import React from "react";
import { Link } from "react-router-dom";

const UserItem = ({ user: { avatar_url, login } }) => {
  return (
    <Link
      to={`/user/${login}`}
      className="w-full card shadow-md mb-4 side compact bg-base-100"
    >
      <div className="flex-row card-body gap-5 items-center">
        <div className="avatar w-14 h-14 ">
          <img className="rounded-full" src={avatar_url} alt="profile" />
        </div>
        <div>
          <h2 className="card-title">{login}</h2>
          <p className=" text-lg text-base-content text-opacity-40">
            Visit Profile
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserItem;
