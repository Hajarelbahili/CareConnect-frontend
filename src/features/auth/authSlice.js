import { createSlice } from "@reduxjs/toolkit";
import { authStorage } from "./authStorage";

const token = authStorage.getToken();
const user = authStorage.getUser();

const initialState = {
  token,
  user,
  isAuthenticated: !!token
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;

      state.token = token;
      state.user = user;
      state.isAuthenticated = true;

      authStorage.save(token, user);
    },

    logout: (state) => {
      authStorage.clear();

      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
