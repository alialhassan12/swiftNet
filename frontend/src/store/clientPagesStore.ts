import {create} from 'zustand';

interface ClientPagesState{
    page:string,
    setPage:(page:string)=>void
}

const useClientPagesStore=create<ClientPagesState>((set)=>({
    page:"dashboard",
    setPage:(page:string)=>set({page})
}))

export default useClientPagesStore;