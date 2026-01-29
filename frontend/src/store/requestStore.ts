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

type Request ={
    id:number,
    name:string,
    email:string,
    password:string,
    phone:string
    address:string,
    plan:string,
    status:string
}

interface RequestState{
    newRequest:Request | null,
    createRequest:(formData:requestForm)=>Promise<Boolean>
    creatingRequest:boolean
}

export const useRequestStore=create<RequestState>((set)=>({
    newRequest:null,
    creatingRequest:false,
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
    }
}));