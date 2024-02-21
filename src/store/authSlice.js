import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  userData: undefined,
  userRole: "guest",
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.userData = action.payload;
      if (action.payload?.isAdmin) {
        state.userRole = "admin"; // If user is an admin, set the role to admin
      } else if (action.payload?.isBusiness) {
        state.userRole = "business"; // If user is not an admin but is a business, set the role to business
      } else {
        state.userRole = "guest"; // If user is neither admin nor business, set the role to guest
      }
      state.token = action.payload.token;
    },
    logout(state) {
      state.loggedIn = false;
      state.userData = undefined;
      state.userRole = "guest";
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
