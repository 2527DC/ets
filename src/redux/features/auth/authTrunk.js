import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_CLIENT } from "../../../Api/API_Client"; 
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({formData, endpoint}, { rejectWithValue }) => {
    console.log("Login endpoint:", formData);
    
    try {
      // Use the dynamic endpoint
      const response = await API_CLIENT.post(endpoint, formData);
      const { token, allowedModules, user } = response.data;
      
      // Store token and user data
      Cookies.set('auth_token', token, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      // Store permissions and user data in local storage instead of session storage
      localStorage.setItem('userPermissions', JSON.stringify({
        allowedModules,
        user: user,
        lastUpdated: new Date().toISOString()
      }));
      
      return { user: user, token, allowedModules };
    } catch (error) {
      // Clear storage on error
      Cookies.remove('auth_token');
      localStorage.removeItem('userPermissions');
      
      // Return a more detailed error message
      return rejectWithValue(
        error.response?.data?.message || 
        error.response?.data || 
        'Login failed'
      );
    }
  }
);