import { create } from 'zustand';
import axiosInstance from '@/lib/axios';

export type ClientProfile = {
    id: number;
    user_id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    plan_name: string;
    status: string;
    created_at: string;
    updated_at: string;
};

interface ClientProfileState {
    profile: ClientProfile | null;
    gettingProfile: boolean;
    getProfile: () => Promise<void>;
}

export const useClientProfileStore = create<ClientProfileState>((set) => ({
    profile: null,
    gettingProfile: false,
    getProfile: async () => {
        set({ gettingProfile: true });
        try {
            const response = await axiosInstance.get('/client/profile');
            set({ profile: response.data.data });
        } catch (error: any) {
            console.error("Failed to fetch client profile:", error);
        } finally {
            set({ gettingProfile: false });
        }
    }
}));
