const initialState = {
  user: null,
  token: localStorage.getItem("token") || null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_TOKEN":
      localStorage.setItem("token", action.payload);
      return { ...state, token: action.payload };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export default authReducer;
