const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const requestOptions = {
  method: "GET",
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
};

export const searchUsers = async (userName) => {
  const params = new URLSearchParams({ q: userName });

  const res = await fetch(
    `${GITHUB_URL}/search/users?${params}`,
    requestOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const { items } = await res.json();

  return items;
};

export const getUserAndRepos = async (userName) => {
  try {
    const params = new URLSearchParams({
      per_page: 10,
      sort: "created_at",
    });

    const [user, repos] = await Promise.all([
      fetchJSON(`${GITHUB_URL}/users/${userName}`, requestOptions),
      fetchJSON(
        `${GITHUB_URL}/users/${userName}/repos?${params}`,
        requestOptions
      ),
    ]);

    return [user, repos];
  } catch (error) {
    console.log(error.message);
  }
};
