import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    console.log("Token utilizzato in fetchUserInfo:", token);
    if (!token) {
      return rejectWithValue("Utente non loggato");
    }
    try {
      const response = await axios.get("http://localhost:8080/user/me/info", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Dati ricevuti dall'API:", response.data);

      return response.data;
    } /* catch (error) {
      console.error("Errore Axios in fetchUserInfo:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Errore nel recupero dati utente"
      );
    } */ catch (error) {
      if (error.response && error.response.status === 401) {
        console.warn("Token non valido, utente disconnesso.");
        return rejectWithValue("Utente non loggato");
      }
      return rejectWithValue("Errore nel recupero dati utente");
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

export const deleteEvent = createAsyncThunk(
  "user/deleteEvent",
  async (eventId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue("Token non trovato");
    }
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/eventi/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            utenteId: getState().user.user.id
          }
        }
      );

      if (response.status !== 204) {
        throw new Error("Errore nell'eliminazione dell'evento");
      }

      console.log(`Evento con ID ${eventId} eliminato con successo`);
      return eventId;
    } catch (error) {
      console.error("Errore Axios in deleteEvent:", error);
      return rejectWithValue(
        error.response
          ? error.response.data
          : "Errore durante l'eliminazione dell'evento"
      );
    }
  }
);

export const deleteReservation = createAsyncThunk(
  "user/deleteReservation",
  async (reservationId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      console.error("Token di autenticazione mancante");
      return rejectWithValue("Token non trovato");
    }

    console.log("Token:", token);

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/prenotazioni/${reservationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status !== 204) {
        throw new Error("Errore nell'annullamento della prenotazione");
      }

      console.log(
        `Prenotazione con ID ${reservationId} annullata con successo`
      );
      return reservationId;
    } catch (error) {
      console.error("Errore Axios in deleteReservation:", error);
      return rejectWithValue(
        error.response
          ? error.response.data
          : "Errore durante l'annullamento della prenotazione"
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
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        if (state.user) {
          state.user.eventiCreati = state.user.eventiCreati.filter(
            (evento) => evento.id !== action.payload
          );
        }
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        if (state.user) {
          state.user.eventiPartecipati = state.user.eventiPartecipati.filter(
            (evento) => evento.id !== action.payload
          );
        }
      });
  }
});

export default userSlice.reducer;
