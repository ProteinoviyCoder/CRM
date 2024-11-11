import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";

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
} = userSlice.actions;
export default userSlice.reducer;
