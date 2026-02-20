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
    gettingClients:boolean,
    changingClientStatus:boolean,
    setClients:(clients:Client[])=>void,
    getClients:()=>Promise<boolean>,
    changeClientStatus:({client_id,newStatus}:{client_id:number,newStatus:string})=>Promise<void>
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
    },
    changingClientStatus:false,
    changeClientStatus:async({client_id,newStatus}:{client_id:number,newStatus:string})=>{
        set({changingClientStatus:true})
        try {
            const response=await axiosInstance.post('/admin/clients/updateStatus',{client_id,newStatus});
            set({clients:response.data.clients});
        } catch (error:any) {
            toast.error(error?.response?.data?.message);
        } finally{
            set({changingClientStatus:false});
        }
    }
}))