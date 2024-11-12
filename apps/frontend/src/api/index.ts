import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

/**------------------Helper functions--------------------------------- */

// Get the authentication token from sessionStorage
const getAuthToken = (): string | null => {
  try {
    const token = sessionStorage.getItem('token');
    return token ? token : null;
  } catch (error) {
    console.error('Error retrieving auth token from sessionStorage:', error);
    return null;
  }
};

// Get the user from sessionStorage
const getUserFromSessionStorage = (): string | null => {
  try {
    const storedUser: any = sessionStorage.getItem('user');
    const user: { username: string; sub: string } | null =
      JSON.parse(storedUser);
    return user ? user.sub : null;
  } catch (error) {
    console.error('Error retrieving user from sessionStorage:', error);
    return null;
  }
};

// Get axios headers with Authorization token
const getAuthHeaders = (): AxiosRequestConfig['headers'] => {
  const token = getAuthToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// Make API requests with Authorization header
const makeRequest = async (
  method: 'get' | 'post' | 'delete',
  url: string,
  data?: any
) => {
  const headers = getAuthHeaders();
  const config: AxiosRequestConfig = { headers };
  if (method === 'get') {
    return axios.get(url, { ...config, params: data });
  } else if (method === 'post') {
    return axios.post(url, data, config);
  } else if (method === 'delete') {
    return axios.delete(url, config);
  }
  throw new Error('Invalid request method');
};

/**------------------------------------------------------------------ */
/**-----------------------------Stocks------------------------------- */

// Fetch a list of stocks
export const fetchStocks = async (page: number, limit: number) => {
  try {
    const response = await makeRequest('get', `${API_BASE_URL}/stocks`, {
      page,
      limit,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};

// Fetch details of a single stock by its symbol
export const fetchStockDetails = async (symbol: string) => {
  try {
    const response = await makeRequest(
      'get',
      `${API_BASE_URL}/stocks/${symbol}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching stock details:', error);
    throw error;
  }
};

/**----------------------User Portfolio------------------------------- */

// Fetch user portfolio
export const fetchUserPortfolio = async () => {
  try {
    const userId = getUserFromSessionStorage();
    if (!userId) throw new Error('User not authenticated');

    const response = await makeRequest(
      'get',
      `${API_BASE_URL}/user-portfolio/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return [];
  }
};

// Add a stock to the user's portfolio
export const addStockToPortfolio = async (symbol: string, quantity: number) => {
  try {
    const userId = getUserFromSessionStorage();
    if (!userId) throw new Error('User not authenticated');

    const response = await makeRequest(
      'post',
      `${API_BASE_URL}/user-portfolio/${userId}/stocks`,
      { stockId: symbol, quantity }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding stock to portfolio:', error);
    throw error;
  }
};

// Remove a stock from the user's portfolio
export const removeStockFromPortfolio = async (stockId: string) => {
  try {
    const userId = getUserFromSessionStorage();
    if (!userId) throw new Error('User not authenticated');

    const response = await makeRequest(
      'delete',
      `${API_BASE_URL}/user-portfolio/${userId}/stocks/${stockId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error removing stock from portfolio:', error);
    throw error;
  }
};

// Update stock quantity in the user's portfolio
export const updateStockQuantityInPortfolio = async (
  stockId: string,
  quantity: number
) => {
  try {
    const userId = getUserFromSessionStorage();
    if (!userId) throw new Error('User not authenticated');

    const response = await makeRequest(
      'post',
      `${API_BASE_URL}/user-portfolio/${userId}/stocks/${stockId}`,
      { quantity }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating stock quantity:', error);
    throw error;
  }
};

/**-----------------------------Users-------------------------------- */

// Register a new user
export const registerUser = (userData: {
  username: string;
  password: string;
}) => {
  return axios.post(`${API_BASE_URL}/auth/register`, userData);
};

// Login user
export const loginUser = (userData: { username: string; password: string }) => {
  return axios.post(`${API_BASE_URL}/auth/login`, userData);
};

// Fetch user data
export const fetchUserData = (token: string) => {
  return axios.get(`${API_BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
