import {create} from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';
import type { Plan } from './planStore';

type requestForm={
    name:string,
    email:string,
    password:string,
    phone:string
    address:string,
    plan_id:number,
}

export type Request ={
    id:number,
    name:string,
    email:string,
    password:string,
    phone:string
    address:string,
    plan:Plan,
    status:string,
    created_at:string,
    updated_at:string
}
type RequestPagination={
    'data':Request[],
    'current_page':number,
    'last_page':number,
    'per_page':number,
    'total':number
}

interface RequestState{
    requests:RequestPagination | null,
    newRequest:Request | null,
    creatingRequest:boolean,
    pageNumber:number,
    gettingRequests:boolean,
    approvingRequest:boolean,
    rejectingRequest:boolean,
    createRequest:(formData:requestForm)=>Promise<Boolean>,
    getRequests:(page:number)=>Promise<Boolean>,
    approveRequest:(id:number)=>Promise<Boolean>,
    rejectRequest:(id:number)=>Promise<Boolean>
}

export const useRequestStore=create<RequestState>((set)=>({
    newRequest:null,
    creatingRequest:false,
    requests:null,
    gettingRequests:false,
    approvingRequest:false,
    rejectingRequest:false,
    createRequest:async(formData:requestForm)=>{
        set({creatingRequest:true})
        try {
            const response =await axiosInstance.post('/createRequest',formData);
            return true;
        } catch (error:any) {
            toast.error(error?.response?.data?.message);
            return false;
        }finally{  
            set({creatingRequest:false});
        }
    },
    pageNumber:1,
    getRequests:async(page:number=1)=>{
        set({gettingRequests:true});
        try {
            const response =await axiosInstance.get(`/admin/requests?page=${page}`);
            set({requests:response.data.requests});
            return true;
        } catch (error:any) {
            toast.error(error?.response?.data?.message);
            return false;
        }finally{
            set({gettingRequests:false});
        }
    },
    approveRequest:async(id:number)=>{
        set({approvingRequest:true});
        try {
            const response =await axiosInstance.post(`/admin/request/approve/${id}`);
            toast.success(response.data.message);
            return true;
        } catch (error:any) {
            toast.error(error?.response?.data?.message);
            return false;
        }finally{
            set({approvingRequest:false});
        }
    },
    rejectRequest:async(id:number)=>{
        set({rejectingRequest:true});
        try {
            const response =await axiosInstance.post(`/admin/request/reject/${id}`);
            toast.success(response.data.message);
            return true;
        } catch (error:any) {
            toast.error(error?.response?.data?.message);
            return false;
        }finally{
            set({rejectingRequest:false});
        }
    }
}));