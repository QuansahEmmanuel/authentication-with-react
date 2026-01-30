import { create } from 'zustand';
import api from '../lib/axiosInstance';

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,

    login: async (email, password) => {
        set({ loading: true, error: null });

        const res = await api.post('/auth/login', { email, password });

        set({
            user: res.data.user,
            isAuthenticated: true,
            loading: false,
        });

        return res.data;
    },

    checkAuth: async () => {
        set({ loading: true });
        try {
            const res = await api.get('/auth/me');

            set({
                user: res.data.user,
                isAuthenticated: true,
                loading: false,
            });

        } catch {
            set({
                user: null,
                isAuthenticated: false,
                loading: false,
            });
        }
    },

    logout: async () => {
        await api.post('/auth/logout');
        set({ user: null, isAuthenticated: false });
    },
}));
