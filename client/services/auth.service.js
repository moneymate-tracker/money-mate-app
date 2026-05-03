import axios from 'axios';

let AsyncStorage = null;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (error) {
  // Silent fallback to memory storage
}

const API_URL = 'http://192.168.29.240:8000/api/v1/auth';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const memoryStorage = {};

const saveItem = async (key, value) => {
  if (!AsyncStorage) {
    memoryStorage[key] = value;
    return;
  }

  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    memoryStorage[key] = value;
  }
};

const getItem = async (key) => {
  if (!AsyncStorage) {
    return memoryStorage[key] || null;
  }

  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return memoryStorage[key] || null;
  }
};

const removeItem = async (key) => {
  if (!AsyncStorage) {
    delete memoryStorage[key];
    return;
  }

  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    delete memoryStorage[key];
  }
};

// ✅ Attach token automatically
api.interceptors.request.use(async (config) => {
  const token = await getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Save tokens
const saveTokens = async (accessToken, refreshToken) => {
  if (accessToken) await saveItem('accessToken', accessToken);
  if (refreshToken) await saveItem('refreshToken', refreshToken);
};

// ✅ Clear tokens
const clearTokens = async () => {
  await removeItem('accessToken');
  await removeItem('refreshToken');
};

// ✅ Signup
const signup = async (userData) => {
  const res = await api.post('/register', userData);
  return res.data?.data || res.data;
};

// ✅ Login
const login = async (credentials) => {
  const res = await api.post('/login', credentials);
  const data = res.data?.data || res.data;

  if (data?.accessToken) {
    await saveTokens(data.accessToken, data.refreshToken);
  }

  return data;
};

// ✅ Logout
const logout = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.warn('Logout API failed, clearing local tokens anyway');
  } finally {
    await clearTokens();
  }
};

// ✅ Check Auth
const checkAuthStatus = async () => {
  const token = await getItem('accessToken');

  if (!token) throw new Error('No token');

  const res = await api.get('/status');
  return res.data?.data || res.data;
};

export default {
  signup,
  login,
  logout,
  checkAuthStatus,
};