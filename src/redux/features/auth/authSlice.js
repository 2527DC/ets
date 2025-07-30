import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authTrunk";

const initialState = {
  user: null, // Changed from "" to null for clarity
  error: "",
  success: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    resetAuthState: (state) => {
      state.error = "";
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true; // Set success to true for navigation
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
