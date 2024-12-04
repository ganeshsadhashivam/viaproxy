import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userRole: string | null;
}

const initialState: AuthState = {
  userRole: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
    clearUserRole: (state) => {
      state.userRole = null;
    },
    logout: (state) => {
      // Clear all user-related data (extend this if needed)
      state.userRole = null;
    },
  },
});

export const { setUserRole, clearUserRole, logout } = authSlice.actions;

export default authSlice.reducer;
