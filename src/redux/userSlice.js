import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    console.log("Token utilizzato in fetchUserInfo:", token);
    if (!token) {
      return rejectWithValue("Token non trovato");
    }
    try {
      const response = await axios.get("http://localhost:8080/user/me/info", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Dati ricevuti dall'API:", response.data);

      return response.data;
    } catch (error) {
      console.error("Errore Axios in fetchUserInfo:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Errore nel recupero dati utente"
      );
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (formData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue("Token non trovato");
    }
    try {
      const response = await axios.patch(
        "http://localhost:8080/user/auth/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Dati ricevuti da updateUserAvatar:", response.data);

      return response.data;
    } catch (error) {
      console.error("Errore Axios in updateUserAvatar:", error);
      return rejectWithValue(
        error.response
          ? error.response.data
          : "Errore durante l'aggiornamento dell'avatar"
      );
    }
  }
);

const initialState = {
  user: null,
  status: "idle",
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        if (state.user) {
          state.user.avatar = action.payload.avatar;
        }
      });
  }
});

export default userSlice.reducer;
