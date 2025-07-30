import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_CLIENT } from "../../../Api/API_Client";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API_CLIENT.post("/auth/login", credentials);

      return response.data; // ✅ this is what your .unwrap() will get
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
