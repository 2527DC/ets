import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_CLIENT } from "../../../Api/API_Client";
import Cookies from "js-cookie";
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API_CLIENT.post('/auth/login', credentials);
      const { token, allowedModules, ...userData } = response.data;

      // Store token and user data
      Cookies.set('auth_token', token, { 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      // Store permissions and user data in session storage
      sessionStorage.setItem('userPermissions', JSON.stringify({
        allowedModules,
        user: userData,
        lastUpdated: new Date().toISOString()
      }));

      return { user: userData, token, allowedModules };
    } catch (error) {
      // Clear storage on error
      Cookies.remove('auth_token');
      sessionStorage.removeItem('userPermissions');
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);