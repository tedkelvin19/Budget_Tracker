import { create } from "zustand";
import { authApi } from "../../api/auth.api";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  isAuthenticated: !!localStorage.getItem("access_token"),

  login: async (payload) => {
    set({ loading: true });
    try {
      const { data } = await authApi.login(payload);
      localStorage.setItem("access_token", data.access_token);
      if (data.refresh_token) localStorage.setItem("refresh_token", data.refresh_token);
      const profile = await authApi.me();
      set({ user: profile.data, isAuthenticated: true, loading: false });
      return profile.data;
    } catch (error) {
      set({ loading: false, isAuthenticated: false, user: null });
      throw error;
    }
  },

  register: async (payload) => {
    set({ loading: true });
    try {
      const response = await authApi.register(payload);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  fetchMe: async () => {
    if (!localStorage.getItem("access_token")) {
      set({ isAuthenticated: false, user: null, loading: false });
      return null;
    }
    set({ loading: true });
    try {
      const { data } = await authApi.me();
      set({ user: data, isAuthenticated: true, loading: false });
      return data;
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      set({ user: null, isAuthenticated: false, loading: false });
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({ user: null, isAuthenticated: false, loading: false });
  },
}));
