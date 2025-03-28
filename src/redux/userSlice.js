import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    console.log("Token utilizzato in fetchUserInfo:", token);
    if (!token) {
      return rejectWithValue("Utente non loggato");
    }
    try {
      const response = await fetch("http://localhost:8080/user/me/info", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.warn("Token non valido, utente disconnesso.");
          return rejectWithValue("Utente non loggato");
        }
        throw new Error("Errore nel recupero dati utente");
      }

      const data = await response.json();
      console.log("✅ Dati ricevuti dall'API:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (formData, { getState, rejectWithValue, dispatch }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue("Token non trovato");
    }
    try {
      const response = await fetch("http://localhost:8080/user/auth/avatar", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento dell'avatar");
      }

      const data = await response.json();
      console.log("Dati ricevuti da updateUserAvatar:", data);
      dispatch(fetchUserInfo());

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
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
      const response = await fetch(
        `http://localhost:8080/api/eventi/${eventId}`,
        {
          method: "DELETE",
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
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReservation = createAsyncThunk(
  "user/deleteReservation",
  async (reservationId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    console.log("🔑 Token inviato:", token);
    console.log("📛 ID prenotazione inviato:", reservationId);

    if (!token) {
      return rejectWithValue("Token non trovato");
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/prenotazioni/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'annullamento della prenotazione");
      }

      console.log(
        `Prenotazione con ID ${reservationId} annullata con successo`
      );
      return reservationId;
    } catch (error) {
      return rejectWithValue(error.message);
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
