import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { type Client } from "@/store/adminClientManagementStore";
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Shield, 
    Calendar,
    Activity,
    CreditCard
} from "lucide-react";

interface ClientDialogProps {
    open: boolean;
    selectedClient: Client | null;
    setOpen: (open: boolean) => void;
}

const InfoRow = ({ icon: Icon, label, value, colorClass = "text-slate-200" }: { icon: any, label: string, value: string | undefined, colorClass?: string }) => (
    <div className="flex items-start gap-3">
        <div className="mt-1 p-2 rounded-lg bg-slate-800/50 text-slate-400">
            <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
            <span className={`text-sm font-semibold ${colorClass}`}>{value || "N/A"}</span>
        </div>
    </div>
);

const ClientDialog = ({ open, setOpen, selectedClient }: ClientDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] bg-slate-950 border-slate-800 p-0 overflow-hidden shadow-2xl">
                {/* Decorative Header with Gradient */}
                <div className="relative h-24 bg-linear-to-br from-blue-600/20 via-indigo-600/10 to-transparent border-b border-slate-800">
                    <div className="absolute -bottom-6 left-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl ring-4 ring-slate-950">
                        <User className="w-8 h-8 text-blue-400" />
                    </div>
                </div>

                <div className="px-6 pt-10 pb-8 space-y-6">
                    <DialogHeader>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <DialogTitle className="text-2xl font-bold text-white tracking-tight">
                                    {selectedClient?.name}
                                </DialogTitle>
                                <DialogDescription className="text-slate-400 mt-1 flex items-center gap-2">
                                    <Activity className="w-3.5 h-3.5" />
                                    Account Record Information
                                </DialogDescription>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${
                                selectedClient?.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                selectedClient?.status === 'suspended' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}>
                                {selectedClient?.status}
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Data Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <section className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-500 border-b border-slate-800 pb-2 uppercase tracking-widest">Contact Details</h3>
                            <div className="space-y-4">
                                <InfoRow icon={Mail} label="Email Address" value={selectedClient?.email} />
                                <InfoRow icon={Phone} label="Phone Number" value={selectedClient?.phone} />
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-500 border-b border-slate-800 pb-2 uppercase tracking-widest">Subscription</h3>
                            <div className="space-y-4">
                                <InfoRow icon={CreditCard} label="Service Plan" value={selectedClient?.plan_name} colorClass="text-blue-400" />
                                <InfoRow icon={Calendar} label="Join Date" value={selectedClient ? new Date(selectedClient.created_at).toLocaleDateString(undefined, { dateStyle: 'long' }) : undefined} />
                            </div>
                        </section>

                        <section className="md:col-span-2 space-y-4">
                            <h3 className="text-xs font-bold text-slate-500 border-b border-slate-800 pb-2 uppercase tracking-widest">Installation Address</h3>
                            <InfoRow icon={MapPin} label="Full Address" value={selectedClient?.address} />
                        </section>
                    </div>

                    {/* Security Footer Note */}
                    <div className="mt-2 p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-slate-300">Administrative Access</p>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                                You are viewing a secure client record. All modifications to this data or service status are logged in the system audit trail.
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ClientDialog;