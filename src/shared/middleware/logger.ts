import { Middleware } from "@reduxjs/toolkit";

export const logger: Middleware = (store) => (next) => (action) => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
    console.log("Dispatching ", action);
    console.log("State before dispatch: ", store.getState());
    next(action);
    console.log("State after dispatch: ", store.getState());
    console.log(" ");
  } else {
    next(action);
  }
};
