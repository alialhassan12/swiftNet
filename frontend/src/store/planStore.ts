import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import {create} from "zustand";

export type Plan={
    id?:number;
    name:string;
    price:number;
    speed:string;
    data:string;
    description:string;
    is_active:boolean;
}

interface PlanState{
    plans:Plan[];
    setPlans: (plans: Plan[]) => void;
    createPlan:(plan:Plan)=>Promise<void>;
    getPlans:()=>Promise<void>;
    activatePlan:(id:number)=>Promise<void>;
    deactivatePlan:(id:number)=>Promise<void>;
}

export const usePlanStore = create<PlanState>((set) => ({
    plans: [],
    setPlans: (plans: Plan[]) => set({ plans }),
    createPlan:async(plan:Plan)=>{
        try {
            const response =await axiosInstance.post('/admin/plans',plan);
            toast.success(response.data.message);
            set((state:PlanState)=>({plans:[...state.plans,response.data.plan]}));
        } catch (error:any) {
            toast.error(error?.response?.data?.message);
        }
    },
    getPlans:async()=>{
        try {
            const response =await axiosInstance.get('/plans');
            set((state:PlanState)=>({plans:response.data.plans}));
        } catch (error:any) {
            toast.error(error?.response?.data?.message);
        }
    },
    activatePlan:async(id:number)=>{
        try {
            const response =await axiosInstance.get(`/admin/plans/activate/${id}`);
            toast.success(response.data.message);
            set((state:PlanState)=>({plans:response.data.plans}));
        } catch (error:any) {
            toast.error(error?.response?.data?.message);
        }
    },
    deactivatePlan:async(id:number)=>{
        try {
            const response =await axiosInstance.get(`/admin/plans/deactivate/${id}`);
            toast.success(response.data.message);
            set((state:PlanState)=>({plans:response.data.plans}));
        } catch (error:any) {
            toast.error(error?.response?.data?.message);
        }
    }
}));