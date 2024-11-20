import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BusinessTask = {
  id: number;
  title: string;
  description: string;
  status: boolean;
};

export type Business = {
  businessName: string;
  businessTasks: BusinessTask[];
};

type BusinessInitialState = {
  business: null | Business;
};

const initialState: BusinessInitialState = {
  business: null,
};

const businessSlice = createSlice({
  name: "businessSlice",
  initialState,
  reducers: {
    setBusiness: (state, action: PayloadAction<Business>) => {
      state.business = action.payload;
    },
    clearBusines: (state) => {
      state.business = null;
    },
  },
});

export const {
  setBusiness: actionSetBusiness,
  clearBusines: actionClearBusiness,
} = businessSlice.actions;

export default businessSlice.reducer;
