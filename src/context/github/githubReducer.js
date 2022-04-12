const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload, loading: false };

    case "GET_USERS_AND_REPOS":
      const { repos, user } = action.payload;
      return { ...state, user, repos, loading: false };

    case "GET_USER":
      return { ...state, user: action.payload, loading: false };

    case "SET_LOADING":
      return { ...state, loading: true };

    case "FIELD":
      return { ...state, [action.name]: action.payload };

    case "CLEAR_USERS":
      return { ...state, users: [], searchTerm: "" };
    default:
      return state;
  }
};

export default githubReducer;
