import { Button } from "../ui/button";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import {Alert,AlertDescription,AlertTitle} from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner"
import { useRequestStore, type Request } from "@/store/requestStore";
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Package, 
    CheckCircle2,
    XCircle,
    Info
} from "lucide-react";

interface RequestDialogProps {
    request: Request | null;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const InfoRow = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | undefined }) => (
    <div className="flex items-start gap-3">
        <div className="mt-1 p-2 rounded-lg bg-slate-800/50 text-slate-400">
            <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
            <span className="text-sm font-semibold text-slate-200">{value || "N/A"}</span>
        </div>
    </div>
);

const RequestDialog = ({ request, open, setOpen }: RequestDialogProps) => {
    const {rejectRequest,approveRequest,getRequests,pageNumber,approvingRequest,rejectingRequest}=useRequestStore();
    const handleApproveRequest=async()=>{
        await approveRequest(request?.id as number);
        getRequests(pageNumber);
        setOpen(false);
    }
    const handleRejectRequest=async()=>{
        await rejectRequest(request?.id as number);
        getRequests(pageNumber);
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] bg-slate-950 border-slate-800 p-0 overflow-hidden">
                <div className="relative h-24 bg-linear-to-r from-blue-600/20 to-purple-600/20 border-b border-slate-800">
                    <div className="absolute -bottom-6 left-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                        <Package className="w-8 h-8 text-blue-400" />
                    </div>
                </div>

                <div className="px-6 pt-10 pb-6 space-y-6">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <DialogTitle className="text-2xl font-bold text-white">
                                    Request #{request?.id}
                                </DialogTitle>
                                <DialogDescription className="text-slate-400 mt-1">
                                    Submitted on {request ? new Date(request.created_at).toLocaleDateString() : "N/A"}
                                </DialogDescription>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${
                                request?.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                request?.status === 'rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}>
                                {request?.status}
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        <InfoRow icon={User} label="Customer Name" value={request?.name} />
                        <InfoRow icon={Mail} label="Email Address" value={request?.email} />
                        <InfoRow icon={Phone} label="Phone Number" value={request?.phone} />
                        <InfoRow icon={Package} label="Service Plan" value={request?.plan.name} />
                        <div className="md:col-span-2">
                            <InfoRow icon={MapPin} label="Installation Address" value={request?.address} />
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Please review the customer information carefully before taking action. 
                            Approved requests will initiate the installation workflow.
                        </p>
                    </div>
                </div>

                <DialogFooter className="px-6 py-4 bg-slate-900/50 border-t border-slate-800 gap-3">
                    <Button 
                        variant="outline" 
                        onClick={() => setOpen(false)}
                        className="border-slate-800 bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                        Cancel
                    </Button>
                    <div className="flex gap-2 ml-auto">
                        {request?.status=="pending"&&(
                            <>
                            <Button 
                                disabled={rejectingRequest}
                                className="bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-2"
                                onClick={handleRejectRequest}
                            >
                                {rejectingRequest
                                    ?<Spinner/>
                                    :<>  
                                        <XCircle className="w-4 h-4" />
                                        Reject
                                    </>
                                }
                            </Button>
                            <Button 
                                disabled={approvingRequest}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2"
                                onClick={handleApproveRequest}
                            >
                                {approvingRequest
                                    ?<Spinner/>
                                    :<>  
                                        <CheckCircle2 className="w-4 h-4" />
                                        Approve
                                    </>
                                }
                            </Button>
                            </>
                        )}
                        {request?.status === "approved" &&(
                            <Alert className="bg-emerald-500/10 border-emerald-500/20">
                                <Info className="w-5 h-5 text-emerald-400" />
                                <AlertTitle className="text-emerald-400">Approved</AlertTitle>
                                <AlertDescription className="text-emerald-300">
                                    This request has been approved.
                                </AlertDescription>
                            </Alert>
                        )}
                        {request?.status === "rejected" &&(
                            <Alert className="bg-rose-500/10 border-rose-500/20">
                                <Info className="w-5 h-5 text-rose-400" />
                                <AlertTitle className="text-rose-400">Rejected</AlertTitle>
                                <AlertDescription className="text-rose-300">
                                    This request has been rejected.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RequestDialog;