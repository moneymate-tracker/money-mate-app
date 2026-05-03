import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isFirstLaunch: null,
  loading: false,
  error: null,
};

// ✅ Error handler
const getErrorMessage = (error) => {
  if (!error) return 'Something went wrong';

  if (error.response) {
    const data = error.response.data;
    if (data?.message) return data.message;
    if (data?.error) return typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
    if (data?.errors) {
      if (Array.isArray(data.errors)) {
        return data.errors
          .map((item) => item?.message || item?.msg || JSON.stringify(item))
          .join('\n');
      }
      return JSON.stringify(data.errors);
    }
    return `Request failed with status code ${error.response.status}`;
  }

  return error.message || 'Something went wrong';
};

// ✅ Signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.signup(userData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ✅ Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ✅ Logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ✅ Check Auth
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.checkAuthStatus();
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFirstLaunch: (state, action) => {
      state.isFirstLaunch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken || null;
        state.refreshToken = action.payload.refreshToken || null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isFirstLaunch = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isFirstLaunch = false;
      })

      // Check Auth
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isFirstLaunch = false;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isFirstLaunch = true;
      });
  },
});

export const { setFirstLaunch } = authSlice.actions;
export default authSlice.reducer;