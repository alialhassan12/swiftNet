import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
    Plus, 
    Search, 
    MoreVertical, 
    Edit2, 
    Trash2, 
    Wifi, 
    Database, 
    DollarSign,
    Shield,
    ShieldOff,
    Filter,
    TriangleAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { usePlanStore,type Plan } from "@/store/planStore";
import PlanUpdateDialog from "@/components/adminComponents/PlanUpdateDialog";
import { Spinner } from "@/components/ui/spinner";

const StatusBadge = ({ is_active }: { is_active: boolean }) => {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            is_active 
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                : "bg-slate-500/10 text-slate-400 border-slate-500/20"
        }`}>
            {is_active ? <Shield className="w-3.5 h-3.5 mr-1" /> : <ShieldOff className="w-3.5 h-3.5 mr-1" />}
            {is_active ? "Active" : "Inactive"}
        </span>
    );
};

const Plans = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const {createPlan,creatingPlan,getPlans,plans,activatePlan,deactivatePlan,deletePlan,deletingPlan}=usePlanStore();
    const [openUpdateDialog,setOpenUpdateDialog]=useState(false);
    const [selectedPlan,setSelectedPlan]=useState<Plan|null>(null);
    const [planData,setPlanData]=useState<Plan>({
        name:"",
        price:0,
        speed:"",
        data:"",
        description:"",
        is_active:false
    });
    const handleCreatePlan=async()=>{
        await createPlan(planData);
        setPlanData({
            name:"",
            price:0,
            speed:"",
            data:"",
            description:"",
            is_active:false
        });
        setIsAddDialogOpen(false);
    }
    const handleActivatePlan=async(id:number)=>{
        await activatePlan(id);
    }
    const handleDeactivatePlan=async(id:number)=>{
        await deactivatePlan(id);
    }
    const handleDeletePlan=async(id:number)=>{
        await deletePlan(id);
        getPlans();
    }
    useEffect(() => {
        getPlans();
    }, []);

    return (
        <div data-aos="fade-up" className="flex flex-col h-full bg-slate-950 text-slate-200">
            {/* Header for mobile */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4 md:hidden">
                <SidebarTrigger className="text-white" />
                <span className="text-white font-bold">Plans Management</span>
            </header>

            <main className="flex-1 p-6 overflow-auto">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Page Title & Actions */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Internet Plans</h1>
                            <p className="text-slate-400 mt-1 text-sm">Create and manage your subscription offerings</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create New Plan
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-slate-900 border-slate-800 text-slate-200 sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-white">Create New Plan</DialogTitle>
                                        <DialogDescription className="text-slate-400">
                                            Fill in the details for the new internet subscription plan.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label className="text-right text-sm font-medium">Name</label>
                                            <Input value={planData.name} onChange={(e)=>setPlanData({...planData,name:e.target.value})} className="col-span-3 bg-slate-800 border-slate-700" placeholder="e.g. Ultra Fast" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label className="text-right text-sm font-medium">Price ($)</label>
                                            <Input type="number" value={planData.price} onChange={(e)=>setPlanData({...planData,price:Number(e.target.value)})} className="col-span-3 bg-slate-800 border-slate-700" placeholder="49.99" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label className="text-right text-sm font-medium">Speed</label>
                                            <Input value={planData.speed} onChange={(e)=>setPlanData({...planData,speed:e.target.value})} className="col-span-3 bg-slate-800 border-slate-700" placeholder="500 Mbps" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label className="text-right text-sm font-medium">Data</label>
                                            <Input value={planData.data} onChange={(e)=>setPlanData({...planData,data:e.target.value})} className="col-span-3 bg-slate-800 border-slate-700" placeholder="Unlimited" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label className="text-right text-sm font-medium">Description</label>
                                            <Input value={planData.description} onChange={(e)=>setPlanData({...planData,description:e.target.value})} className="col-span-3 bg-slate-800 border-slate-700" placeholder="Short description..." />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" className="border-slate-700 hover:bg-slate-800" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                                        <Button
                                            disabled={creatingPlan}
                                            className="bg-blue-600 hover:bg-blue-500 text-white cursor-pointer" 
                                            onClick={handleCreatePlan}
                                        >
                                            {creatingPlan?<Spinner/>:"Save Plan"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { label: "Active Plans", value: plans?.filter((plan:Plan)=>plan.is_active===true).length, icon: Wifi, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                            { label: "Total Subscribers", value: "1,284", icon: Database, color: "text-blue-400", bg: "bg-blue-400/10" },
                            { label: "Avg. Revenue", value: "$45.50", icon: DollarSign, color: "text-purple-400", bg: "bg-purple-400/10" },
                        ].map((stat, i) => (
                            <div key={i} className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-400">{stat.label}</span>
                                </div>
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Table Section */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <Input 
                                    placeholder="Search plans by name..." 
                                    className="pl-10 bg-slate-950 border-slate-800 text-slate-300 focus:ring-blue-500/20"
                                />
                            </div>
                            <Button variant="outline" className="border-slate-800 text-slate-400 hover:bg-slate-800">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-900/80 text-slate-400 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Plan Name</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Speed</th>
                                        <th className="px-6 py-4">Data Limit</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {plans?.map((plan) => (
                                        <tr key={plan.id} className="hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{plan.name}</span>
                                                    <span className="text-xs text-slate-500 truncate max-w-[200px]">{plan.description}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-semibold text-white">${plan.price}</span>
                                                <span className="text-xs text-slate-500 ml-1">/mo</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Wifi className="w-3.5 h-3.5 text-blue-400" />
                                                    <span className="text-sm text-slate-300">{plan.speed}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Database className="w-3.5 h-3.5 text-purple-400" />
                                                    <span className="text-sm text-slate-300">{plan.data}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge is_active={plan.is_active} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* activate or deactivate button */}
                                                    <Button variant="ghost" size="icon" 
                                                        onClick={()=>{
                                                            if(plan.is_active){
                                                                handleDeactivatePlan(plan.id as number);
                                                            }else{
                                                                handleActivatePlan(plan.id as number);
                                                            }
                                                        }}
                                                        className={`h-8 w-8 ${plan.is_active ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-400/10' : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10'}`}
                                                        title={plan.is_active ? "Deactivate Plan" : "Activate Plan"}>
                                                        {plan.is_active ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                                                    </Button>
                                                    {/* edit plan */}
                                                    <Button variant="ghost" size="icon" 
                                                        title="Edit Plan"
                                                        onClick={()=>{
                                                            setSelectedPlan(plan);
                                                            setOpenUpdateDialog(true);
                                                        }}
                                                        className="h-8 w-8 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10">
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    {/* delete plan */}
                                                        <AlertDialog>
                                                            <AlertDialogTrigger>
                                                                <Button variant="ghost" size="icon" 
                                                                    title="Delete Plan"
                                                                    className="h-8 w-8 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle className="flex items-center gap-2 text-rose-400">
                                                                        <TriangleAlert className="w-5 h-5 text-rose-400" />
                                                                        Are you absolutely sure?
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action cannot be undone. This will permanently delete 
                                                                        <span className="text-white"> {plan.name}</span> plan
                                                                        from our servers.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction 
                                                                        className="bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                                                                        onClick={()=>handleDeletePlan(plan.id!)}
                                                                        disabled={deletingPlan}
                                                                    > {deletingPlan ? <Spinner/>: "Continue"}
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    {/* more Options */}
                                                    <Button variant="ghost" size="icon" 
                                                        title="More Options"
                                                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <PlanUpdateDialog plan={selectedPlan} open={openUpdateDialog} setOpen={setOpenUpdateDialog}></PlanUpdateDialog>
            </main>
        </div>
    );
};

export default Plans;