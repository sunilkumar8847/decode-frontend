import { ENDPOINTS } from '../config/api.config';

interface SignupData {
    firstname: string;
    lastname: string;
    email: string;
    organization: string;
    role: string;
}

interface OtpVerificationData {
    email: string;
    otp: string;
}

interface LoginData {
    email: string;
    otp: string;
}

export const authService = {
    signup: async (data: SignupData) => {
        try {
            const response = await fetch(ENDPOINTS.SIGNUP, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            const responseData = await response.json();
            
            if (!response.ok) {
                throw new Error(responseData.message || 'Registration failed');
            }
            
            return responseData;
        } catch (error) {
            throw error instanceof Error 
                ? error 
                : new Error('Network error during signup');
        }
    },

    verifyOtp: async (data: OtpVerificationData) => {
        try {
            const response = await fetch(ENDPOINTS.VERIFY_OTP, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            const responseData = await response.json();
            
            if (!response.ok) {
                throw new Error(responseData.message || 'OTP verification failed');
            }
            
            return responseData;
        } catch (error) {
            throw error instanceof Error 
                ? error 
                : new Error('Network error during OTP verification');
        }
    },

    login: async (data: LoginData) => {
        try {
            const response = await fetch(ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            const responseData = await response.json();
            
            if (!response.ok) {
                throw new Error(responseData.message || 'Login failed');
            }
            
            return responseData;
        } catch (error) {
            throw error instanceof Error 
                ? error 
                : new Error('Network error during login');
        }
    }
};