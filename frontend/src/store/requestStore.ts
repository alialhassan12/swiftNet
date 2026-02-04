import {create} from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

type requestForm={
    name:string,
    email:string,
    password:string,
    phone:string
    address:string,
    plan:string,
}

export type Request ={
    id:number,
    name:string,
    email:string,
    password:string,
    phone:string
    address:string,
    plan:string,
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
    createRequest:(formData:requestForm)=>Promise<Boolean>,
    getRequests:(page:number)=>Promise<Boolean>
}

export const useRequestStore=create<RequestState>((set)=>({
    newRequest:null,
    creatingRequest:false,
    requests:null,
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
        try {
            const response =await axiosInstance.get(`/admin/requests?page=${page}`);
            set({requests:response.data.requests});
            return true;
        } catch (error:any) {
            toast.error(error?.response?.data?.message);
            return false;
        }
    }
}));