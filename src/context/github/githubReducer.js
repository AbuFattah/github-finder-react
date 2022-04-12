const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload, loading: false };

    case "SET_LOADING":
      return { ...state, loading: true };

    case "FIELD":
      return { ...state, [action.name]: action.payload };

    case "CLEAR":
      return { ...state, users: [], searchTerm: "" };
    default:
      return state;
  }
};

export default githubReducer;
