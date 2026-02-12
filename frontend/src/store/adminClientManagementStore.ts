import {create} from 'zustand';
import axiosInstance from '@/lib/axios';
import toast from 'react-hot-toast';

export type Client={
    id:number,
    user_id:number,
    name:string,
    email:string,
    phone:string,
    address:string,
    plan_id:number,
    plan_name:string,
    status:string,
    created_at:string,
    updated_at:string
}

interface adminClientManagementState{
    clients:Client[],
    setClients:(clients:Client[])=>void,
    getClients:()=>Promise<boolean>,
    gettingClients:boolean,
}

export const useAdminClientManagementStore=create<adminClientManagementState>((set)=>({
    clients:[],
    setClients:(clients:Client[])=>set({clients}),
    gettingClients:false,
    getClients:async()=>{
        set({gettingClients:true});
        try {
            const response =await axiosInstance.get('/admin/clients');
            set({clients:response.data.data});
            return true;
        } catch (error:any) {
            toast.error(error?.response?.data?.message);
            return false;
        }finally{
            set({gettingClients:false});
        }
    }
}))