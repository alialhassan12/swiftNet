import {create} from "zustand";
import axiosInstance from "../lib/axios";
import {toast} from "react-hot-toast";

type AuthUser={
    id:number,
    name:string,
    email:string,
    role:string,
}

interface AuthState {
    authUser: AuthUser | null;
    loggingIn: boolean;
    setAuthUser: (user: AuthUser) => void;
    adminLogin: (formData: FormData) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    setAuthUser: (user: AuthUser) => set({ authUser: user }),
    loggingIn: false,
    adminLogin: async (formData: FormData) => {
        try {
            set({ loggingIn: true });
            const response = await axiosInstance.post("/admin/login", formData);
            const data = response.data;
            set({ authUser: data.user });
            localStorage.setItem("token", data.token);
            toast.success("Login successful");
        } catch (error) {
            toast.error("Invalid credentials");
        } finally {
            set({ loggingIn: false });
        }
    }
}));