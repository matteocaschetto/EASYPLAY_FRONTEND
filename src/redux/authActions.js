export const setUser = (user) => ({
  type: "SET_USER",
  payload: user
});

export const setToken = (token) => ({
  type: "SET_TOKEN",
  payload: token
});

export const logout = () => ({
  type: "LOGOUT"
});
