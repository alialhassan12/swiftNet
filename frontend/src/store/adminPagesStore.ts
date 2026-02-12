import {create} from "zustand";

interface AdminPagesState{
    page:string,
    setPage:(page:string)=>void,
}

const useAdminPagesStore=create<AdminPagesState>((set)=>({
    page:"dashboard",
    setPage:(page:string)=>set({page})
}))

export default useAdminPagesStore;
