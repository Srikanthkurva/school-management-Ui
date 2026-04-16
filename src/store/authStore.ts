import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { authService } from '../services';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (identifier: string, password: string, userType?: string) => Promise<boolean>;
  setupFirstTime: (data: any) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User) => void;
  getMe: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (identifier, password, userType = 'parent') => {
        set({ isLoading: true, error: null });
        try {
          const res = await authService.login({ identifier, password, userType });
          const { user, token } = res.data.data;
          localStorage.setItem('token', token);
          set({ user, token, isAuthenticated: true, isLoading: false, error: null });
          return true;
        } catch (err: any) {
          const message = err.response?.data?.message || 'Login failed. Please try again.';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      setupFirstTime: async (data) => {
        set({ isLoading: true, error: null });
        try {
          await authService.setupFirstTime(data);
          set({ isLoading: false });
          return true;
        } catch (err: any) {
          const message = err.response?.data?.message || 'Setup failed. Please check your details.';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },

      clearError: () => set({ error: null }),

      setUser: (user) => set({ user }),
      
      getMe: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
          const res = await authService.getMe();
          set({ user: res.data.data.user, isAuthenticated: true });
        } catch (err) {
          localStorage.removeItem('token');
          set({ user: null, token: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
