import { FaCodepen, FaStore, FaUserFriends, FaUser } from "react-icons/fa";
import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useGithub } from "../context/github/GithubContext";
import Loading from "../components/Loading/Loading";
import RepoList from "../components/repos/RepoList";
import { getUserAndRepos } from "../context/github/GithubActions";
const User = () => {
  const { login } = useParams();
  const { dispatch, user, loading, repos } = useGithub();

  const {
    avatar_url,
    name,
    type,
    hireable,
    bio,
    html_url,
    location,
    blog,
    email,
    public_repos,
    public_gists,
    followers,
    following,
  } = user;

  useEffect(() => {
    const getUserAndReposData = async () => {
      try {
        dispatch({ type: "SET_LOADING" });
        const { user, repos } = await getUserAndRepos(login);
        dispatch({ type: "GET_USERS_AND_REPOS", payload: { user, repos } });
      } catch {
        <Navigate to="/notfound" />;
      }
    };

    getUserAndReposData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="w-full lg:w-10/12  mx-auto">
        <Link className="btn btn-ghost mb-3" to="/">
          Back To Search
        </Link>

        <div className="lg:profile-top gap-20 grid-cols-1">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className=" shadow-xl card image-full">
              <figure>
                <img src={avatar_url} alt="" />
              </figure>
              <div className="card-body justify-end">
                <div>
                  <h2 className="card-title mb-0">{name}</h2>
                  <p>{login}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6 space-y-5">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold align-middle">{name}</h1>
              <div className="ml-2 mr-1 badge badge-success">{type}</div>
              {hireable && <div className="badge badge-info">Hireable</div>}
            </div>

            <p className="mt-4 text-lg leading-5 ">{bio}</p>

            <div className=" mt-4 card-actions">
              <a
                className="btn btn-outline"
                href={html_url}
                rel="noreferrer"
                target="_blank"
              >
                View Profile
              </a>
            </div>

            <div>
              <div className="mt-4 stats flex stats-vertical md:stats-horizontal shadow-xl  w-[100%] ">
                {location && (
                  <div className="stat">
                    <div className="stat-tittle">Location</div>
                    <div className="stat-value text-lg">{location}</div>
                  </div>
                )}
                {blog && (
                  <div className="stat">
                    <div className="stat-tittle">Website</div>
                    <a
                      href={blog.includes("//") ? blog : `//${blog}`}
                      target="_blank"
                      className="stat-value text-lg whitespace-pre-wrap"
                    >
                      {blog}
                    </a>
                  </div>
                )}
                {email && (
                  <div className="stat">
                    <div className="stat-tittle">Email</div>
                    <div className="stat-value text-lg ">{email}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mt-4 stats stats-vertical md:stats-horizontal shadow w-full">
            {followers && (
              <div className="stat">
                <div className="stat-figure text-secondary text-5xl">
                  <FaUserFriends />
                </div>
                <div className="stat-tittle">Followers</div>
                <div className="stat-value text-2xl md:text-4xl">
                  {followers}
                </div>
              </div>
            )}
            {following && (
              <div className="stat">
                <div className="stat-figure text-secondary text-5xl">
                  <FaStore />
                </div>
                <div className="stat-tittle">Following</div>
                <div className="stat-value text-2xl md:text-4xl ">
                  {following}
                </div>
              </div>
            )}
            {public_repos && (
              <div className="stat">
                <div className="stat-figure text-secondary text-5xl">
                  <FaCodepen />
                </div>
                <div className="stat-tittle">Public Repos</div>
                <div className="stat-value text-2xl md:text-4xl">
                  {public_repos}
                </div>
              </div>
            )}
            {public_gists && (
              <div className="stat">
                <div className="stat-figure text-secondary text-5xl">
                  <FaStore />
                </div>
                <div className="stat-tittle">Public Gists</div>
                <div className="stat-value text-2xl md:text-4xl ">
                  {public_gists}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RepoList repos={repos} />
    </div>
  );
};

export default React.memo(User);
