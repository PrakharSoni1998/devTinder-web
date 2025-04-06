import { createSlice } from "@reduxjs/toolkit";

const connectionRequestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: (state, action) => {
      return state.filter((request) => request._id !== action.payload);
    },
  },
});

export const { addRequest, removeRequest } = connectionRequestSlice.actions;
export default connectionRequestSlice.reducer;
