import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: false,
};

const darkThemeSlice = createSlice({
  name: "darkTheme",
  initialState,
  reducers: {
    toggleDarkTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { toggleDarkTheme } = darkThemeSlice.actions;
export default darkThemeSlice.reducer;
