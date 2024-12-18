import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  username: string;
  permissions: string | string[];
  role: string;
  themeSetting: {
    theme: string;
    mod: string;
  };
};

export type UserSlice = {
  user: User | null;
  isAuth: boolean;
  isFirstTry: boolean;
};

const initialState: UserSlice = {
  user: null,
  isAuth: false,
  isFirstTry: true,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    setUserTheme: (state, action) => {
      if (state.user) state.user.themeSetting.theme = action.payload;
    },
    setUserThemeMod: (state, action) => {
      if (state.user) state.user.themeSetting.mod = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuth = false;
    },
    changefirstTry: (state, action: PayloadAction<boolean>) => {
      state.isFirstTry = action.payload;
    },
  },
});

export const {
  setUser: actionSetUser,
  logoutUser: actionLogoutUser,
  changefirstTry: actionChangefirstTry,
  setUserTheme: actionSetUserTheme,
  setUserThemeMod: actionSetUserThemeMod,
} = userSlice.actions;
export default userSlice.reducer;
