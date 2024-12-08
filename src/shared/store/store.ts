import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { apiStore } from "../apiSlice/api";
import { logger } from "../middleware/logger";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiStore.middleware).concat(logger);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type ApiDispatch = typeof store.dispatch;
