import {create} from "zustand";
import axiosInstance from "../lib/axios";
import {toast} from "react-hot-toast";

type AuthUser={
    id:number,
    name:string,
    email:string,
    role:string,
    created_at:Date,
    updated_at:Date
}

interface AuthState {
    authUser: AuthUser | null;
    loggingIn: boolean;
    isChecking:boolean;
    loggingOut:boolean;
    setAuthUser: (user: AuthUser) => void;
    adminLogin: (formData: LoginForm) => Promise<boolean>;
    check:()=>Promise<void>;
    logout:()=>Promise<void>;
}
type LoginForm={
    email:string,
    password:string,
}

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    setAuthUser: (user: AuthUser) => set({ authUser: user }),
    loggingIn: false,
    adminLogin: async (formData: LoginForm) => {
        try {
            set({ loggingIn: true });
            const response = await axiosInstance.post("/login", formData);
            const data = response.data;
            set({ authUser: data.user });
            localStorage.setItem("token", data.token);
            toast.success("Login successful");
            return true;
        } catch (error) {
            
            toast.error("Invalid credentials");
            return false;
        } finally {
            set({ loggingIn: false });
        }
    },

    isChecking:false,
    check:async()=>{
        set({isChecking:true});
        try {
            const token=localStorage.getItem('token');
            if(!token){
                set({authUser:null});
                return;
            }
            const response=await axiosInstance.get('/check');
            set({authUser:response.data.user});
        } catch (error) {
            set({authUser:null});
            localStorage.removeItem('token');
        }finally{
            set({isChecking:false});
        }
    },
    loggingOut:false,
    logout:async()=>{
        set({loggingOut:true});
        try{
            const response=await axiosInstance.post('/logout');
            localStorage.removeItem('token');
            set({authUser:null});
            toast.success(response.data.message);
        }catch(error){
            toast.error("somthing went wrong!");
        }finally{
        set({loggingOut:false});
        }
    }
}));