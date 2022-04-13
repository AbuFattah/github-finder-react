import axios from "axios";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

const requestOptions = {
  method: "GET",
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
};

export const searchUsers = async (userName) => {
  const params = new URLSearchParams({ q: userName });

  const response = await github.get(`/search/users?${params}`);
  // in axios response is an object with json data in it
  return response.data.items;
};

export const getUserAndRepos = async (userName) => {
  try {
    const params = new URLSearchParams({
      per_page: 10,
      sort: "created_at",
    });

    const [user, repos] = await Promise.all([
      github.get(`/users/${userName}`),
      github.get(`/users/${userName}/repos?${params}`),
    ]);
    return { user: user.data, repos: repos.data };
  } catch (error) {
    console.log(error.message);
  }
};
