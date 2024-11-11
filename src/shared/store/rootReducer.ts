import { combineReducers } from "redux";
import { apiStore } from "@/shared/apiSlice/api";
import userSlice from "@/features/auth/model/userSlice";

export const rootReducer = combineReducers({
  [apiStore.reducerPath]: apiStore.reducer,
  user: userSlice,
});
