import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import darkThemeSlice from "./darkThemeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    darkTheme: darkThemeSlice,
  },
});

export default store;
