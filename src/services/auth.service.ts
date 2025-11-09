import { createClient } from '@supabase/supabase-js';

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

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or anon key is not defined');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authService = {
    signup: async (data: SignupData) => {
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: data.email,
                options: {
                    shouldCreateUser: true
                }
            });

            if (error) {
                throw new Error(error.message || 'Failed to send OTP');
            }

            return { success: true, message: 'OTP sent to your email' };
        } catch (error) {
            throw error instanceof Error
                ? error
                : new Error('Network error during signup');
        }
    },

    verifyOtp: async (data: OtpVerificationData) => {
        try {
            const { data: authData, error } = await supabase.auth.verifyOtp({
                email: data.email,
                token: data.otp,
                type: 'email'
            });

            if (error) {
                throw new Error(error.message || 'OTP verification failed');
            }

            return { success: true, user: authData.user };
        } catch (error) {
            throw error instanceof Error
                ? error
                : new Error('Network error during OTP verification');
        }
    },

    login: async (data: LoginData) => {
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: data.email,
                options: {
                    shouldCreateUser: false
                }
            });

            if (error) {
                throw new Error(error.message || 'Failed to send OTP');
            }

            return { success: true, message: 'OTP sent to your email' };
        } catch (error) {
            throw error instanceof Error
                ? error
                : new Error('Network error during login');
        }
    }
};