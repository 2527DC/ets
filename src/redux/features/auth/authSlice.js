import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginUser } from "./authTrunk";
import { logDebug } from "../../../utils/logger";

const initialState = {
  user: null,
  token: null,
  permissions: null, // Added permissions to state
  loading: false,
  error: null,
  isAuthenticated: false,
  lastLogin: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      Object.assign(state, initialState);
    },
    logout: (state) => {
      // Clear all client-side storage
      Cookies.remove('auth_token');
      Cookies.remove('refresh_token');
      sessionStorage.removeItem('userPermissions');
      localStorage.clear();
      
      // Reset state
      Object.assign(state, initialState);
    },
    setAuthCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    loadFromStorage: (state) => {
      // Hydrate state from storage on page refresh
      const storedData = sessionStorage.getItem('userPermissions');
      if (storedData) {
        const { user, permissions } = JSON.parse(storedData);
        state.user = user;
        state.permissions = permissions;
        state.isAuthenticated = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, token, allowedModules } = action.payload;
        
        state.user = user;
        state.token = token;
        state.permissions = allowedModules;
        state.isAuthenticated = true;
        state.lastLogin = new Date().toISOString();
        state.loading = false;
        
        // Persist to session storage
        sessionStorage.setItem('userPermissions', JSON.stringify({
          user,
           allowedModules,
          lastUpdated: new Date().toISOString()
        }));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = {
          message: action.payload?.message || 'Authentication failed',
          status: action.payload?.status || 500,
          errors: action.payload?.errors || null,
          timestamp: new Date().toISOString()
        };
        logDebug(" This is the error " , action.payload?.errors)
        // Clear any partial auth data
        Cookies.remove('auth_token');
        sessionStorage.removeItem('userPermissions');
      });
  }
});

// Action creators
export const { 
  resetAuthState, 
  logout, 
  setAuthCredentials,
  loadFromStorage 
} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectPermissions = (state) => state.auth.permissions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectLastLogin = (state) => state.auth.lastLogin;

export default authSlice.reducer;