import { combineReducers } from "redux";
import { apiStore } from "@/shared/apiSlice/api";
import userReducer from "@/shared/storeSlices/userSlice";
import businessReducer from "@/shared/storeSlices/businessSlice";

export const rootReducer = combineReducers({
  [apiStore.reducerPath]: apiStore.reducer,
  user: userReducer,
  business: businessReducer,
});
