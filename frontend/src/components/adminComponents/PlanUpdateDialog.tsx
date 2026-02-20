import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { usePlanStore,type Plan } from "@/store/planStore";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const PlanUpdateDialog=({plan,open,setOpen}:{plan:Plan|null,open:boolean,setOpen:(open:boolean)=>void})=>{
    const {updatePlan,getPlans,updatingPlan}=usePlanStore();
    const [planData,setPlanData]=useState<Plan>({
        name: "",
        price: 0,
        speed: "",
        data: "",
        description: "",
        is_active: false
    });

    useEffect(()=>{
        if (plan) {
            setPlanData(plan);
        }
    },[plan]);

    const handleUpdatePlan=async(plan:Plan)=>{
        await updatePlan(plan);
        getPlans();
        setOpen(false);
    }
    
    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-200">
                <DialogHeader>
                    <DialogTitle>Update Plan</DialogTitle>
                    <DialogDescription>
                        Update the details of the plan.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Name</label>
                        <Input value={planData.name || ""} onChange={(e)=>setPlanData({...planData,name:e.target.value})} className="col-span-3 bg-slate-800 border-slate-700" placeholder="e.g. Ultra Fast" />
                    </div> 
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Price ($)</label>
                        <Input type="number" value={planData.price} onChange={(e)=>setPlanData({...planData,price:Number(e.target.value)})} className="col-span-3 bg-slate-800 border-slate-700" placeholder="49.99" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Speed</label>
                        <Input value={planData.speed || ""} onChange={(e)=>setPlanData({...planData,speed:e.target.value})} className="col-span-3 bg-slate-800 border-slate-700" placeholder="500 Mbps" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Data</label>
                        <Input value={planData.data || ""} onChange={(e)=>setPlanData({...planData,data:e.target.value})} className="col-span-3 bg-slate-800 border-slate-700" placeholder="50 GB" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Description</label>
                        <Input value={planData.description || ""} onChange={(e)=>setPlanData({...planData,description:e.target.value})} className="col-span-3 bg-slate-800 border-slate-700" placeholder="Description" />
                    </div>
                </div>
                <DialogFooter>
                    <Button 
                        onClick={()=>handleUpdatePlan(planData)} 
                        disabled={updatingPlan}
                        className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 cursor-pointer">
                        {updatingPlan?<Spinner className="h-4 " />:"Update Plan" }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default PlanUpdateDialog;
