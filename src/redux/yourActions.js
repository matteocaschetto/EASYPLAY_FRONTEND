import { fetchData } from "../api";

export const setData = (data) => ({
  type: "SET_DATA",
  payload: data
});

export const fetchDataAsync = () => async (dispatch) => {
  try {
    const data = await fetchData();
    dispatch(setData(data));
  } catch (error) {
    console.error("Error in fetchDataAsync:", error);
  }
};
