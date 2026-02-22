import axios from 'axios';

// Create axios instance with base configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// Authentication API
export const authAPI = {
  // Register new user
  register: (userData) => api.post('/auth/register', userData),
  
  // Login user
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Verify OTP
  verifyOTP: (otpData) => api.post('/auth/verify-otp', otpData),
  
  // Resend OTP
  resendOTP: (email) => api.post('/auth/resend-otp', { email }),
  
  // Get user profile
  getProfile: () => api.get('/auth/profile'),
  
  // Update user profile
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  
  // Change password
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
  
  // Forgot password
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  
  // Reset password
  resetPassword: (resetData) => api.post('/auth/reset-password', resetData),
  
  // Logout
  logout: () => api.post('/auth/logout'),
  
  // Refresh token
  refreshToken: () => api.post('/auth/refresh-token'),
};

// Orders API
export const ordersAPI = {
  // Create new order
  createOrder: (orderData) => api.post('/orders', orderData),
  
  // Get all orders
  getOrders: (params = {}) => api.get('/orders', { params }),
  
  // Get single order
  getOrder: (orderId) => api.get(`/orders/${orderId}`),
  
  // Update order status
  updateOrderStatus: (orderId, statusData) => 
    api.patch(`/orders/${orderId}/status`, statusData),
  
  // Update order progress
  updateOrderProgress: (orderId, progress) => 
    api.patch(`/orders/${orderId}/progress`, { progress }),
  
  // Add milestone
  addMilestone: (orderId, milestoneData) => 
    api.post(`/orders/${orderId}/milestones`, milestoneData),
  
  // Complete milestone
  completeMilestone: (orderId, milestoneName) => 
    api.patch(`/orders/${orderId}/milestones/${milestoneName}`),
  
  // Add attachment
  addAttachment: (orderId, attachmentData) => 
    api.post(`/orders/${orderId}/attachments`, attachmentData),
  
  // Add notes
  addNotes: (orderId, notesData) => 
    api.post(`/orders/${orderId}/notes`, notesData),
  
  // Cancel order
  cancelOrder: (orderId, cancelData) => 
    api.post(`/orders/${orderId}/cancel`, cancelData),
  
  // Add review
  addReview: (orderId, reviewData) => 
    api.post(`/orders/${orderId}/review`, reviewData),
  
  // Get order statistics
  getOrderStats: (params = {}) => api.get('/orders/stats', { params }),
};

// Appointments API
export const appointmentsAPI = {
  // Create appointment
  createAppointment: (appointmentData) => 
    api.post('/appointments', appointmentData),
  
  // Get all appointments
  getAppointments: (params = {}) => 
    api.get('/appointments', { params }),
  
  // Get single appointment
  getAppointment: (appointmentId) => 
    api.get(`/appointments/${appointmentId}`),
  
  // Update appointment status
  updateAppointmentStatus: (appointmentId, statusData) => 
    api.patch(`/appointments/${appointmentId}/status`, statusData),
  
  // Cancel appointment
  cancelAppointment: (appointmentId, cancelData) => 
    api.post(`/appointments/${appointmentId}/cancel`, cancelData),
  
  // Get tailor availability
  getTailorAvailability: (params) => 
    api.get('/appointments/availability', { params }),
  
  // Get upcoming appointments
  getUpcomingAppointments: (params = {}) => 
    api.get('/appointments/upcoming', { params }),
  
  // Add reminder
  addReminder: (appointmentId, reminderData) => 
    api.post(`/appointments/${appointmentId}/reminders`, reminderData),
};

// Users API (for admin)
export const usersAPI = {
  // Get all users (admin only)
  getUsers: (params = {}) => api.get('/users', { params }),
  
  // Get single user
  getUser: (userId) => api.get(`/users/${userId}`),
  
  // Update user (admin only)
  updateUser: (userId, userData) => api.put(`/users/${userId}`, userData),
  
  // Delete user (admin only)
  deleteUser: (userId) => api.delete(`/users/${userId}`),
  
  // Get tailors
  getTailors: (params = {}) => api.get('/users/tailors', { params }),
  
  // Get customers
  getCustomers: (params = {}) => api.get('/users/customers', { params }),
};

// File upload API
export const uploadAPI = {
  // Upload file
  uploadFile: (file, type = 'image') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// WebSocket API
export const websocketAPI = {
  // Get WebSocket status
  getStatus: () => api.get('/websocket'),
};

// Health check API
export const healthAPI = {
  // Check server health
  checkHealth: () => api.get('/health'),
};

// Utility functions
export const apiUtils = {
  // Handle API errors
  handleError: (error) => {
    console.error('API Error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred',
      errors: error.errors || [],
    };
  },
  
  // Format API response
  formatResponse: (response) => {
    return {
      success: true,
      data: response,
    };
  },
  
  // Set auth token
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
  
  // Get auth token
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  // Remove auth token
  removeToken: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // Get user role
  getUserRole: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role;
  },
  
  // Check if user has specific role
  hasRole: (role) => {
    const userRole = apiUtils.getUserRole();
    return userRole === role;
  },
};

export default api; 