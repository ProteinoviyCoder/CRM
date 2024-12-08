import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { themes } from "../themes/themes";
import type { MyTheme } from "../themes/themes";

export type ModeTheme = "dark" | "light";

type InitialState = {
  theme: MyTheme;
  mod: ModeTheme;
};

const initialState: InitialState = {
  theme: themes.standart.palettes,
  mod: "light",
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<MyTheme>) => {
      state.theme = action.payload;
    },
    setMode: (state, action: PayloadAction<ModeTheme>) => {
      state.mod = action.payload;
    },
  },
});

export const { setTheme: actionSetTheme, setMode: actionSetThemeMode } =
  themeSlice.actions;
export default themeSlice.reducer;
