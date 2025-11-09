const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in environment variables');
}

export const ENDPOINTS = {
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    VERIFY_OTP: `${API_BASE_URL}/auth/verify_otp`,
    LOGIN: `${API_BASE_URL}/auth/login`,
};