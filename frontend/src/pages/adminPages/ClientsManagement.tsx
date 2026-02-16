import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAdminClientManagementStore, type Client } from "@/store/adminClientManagementStore";
import { Button, Skeleton } from "@radix-ui/themes";
import { CheckCircle2, Clock, Eye, Filter, GlobeX, MoreVertical, Plus, RadioTower, Search, Users, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        suspended: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    };

    const icons = {
        pending: <Clock className="w-3.5 h-3.5 mr-1" />,
        active: <CheckCircle2 className="w-3.5 h-3.5 mr-1" />,
        suspended: <XCircle className="w-3.5 h-3.5 mr-1" />,
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
            {icons[status as keyof typeof styles]}
            <span className="capitalize">{status}</span>
        </span>
    );
};

const ClientManagement=()=>{
    const {clients,getClients,gettingClients}=useAdminClientManagementStore();
    useEffect(() => {
        getClients();
    }, [getClients]);
    const [status,setStatus]=useState<string>('all');
    return(
        <div data-aos="fade-up" className="flex flex-col h-full">
            {/* Header for mobile */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4 md:hidden">
                <SidebarTrigger className="text-white hover:text-blue-400 transition-colors" />
                <span className="text-white font-bold">Clients Management</span>
            </header>
            <main className="flex-1 p-6 overflow-auto bg-slate-950">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Page Title & Actions */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Clients Management</h1>
                            <p className="text-slate-400 mt-1 text-sm">Review and manage clients</p>
                        </div>
                    </div>
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "Total Subscriptions", value:clients.length, icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
                            { label: "Active", value: clients.filter((client:Client)=>client.status==='active').length, icon: RadioTower, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                            { label: "Pending Installs", value: clients.filter((client:Client)=>client.status==='pending').length, icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10" },
                            { label: "Suspended ", value: clients.filter((client:Client)=>client.status==='suspended').length, icon: GlobeX, color: "text-rose-400", bg: "bg-rose-400/10" },
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
                        {/* Table Controls */}
                        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/60">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <Input 
                                    placeholder="Search by name, email or ID..." 
                                    className="pl-10 bg-slate-950 border-slate-800 text-slate-300 focus:ring-blue-500/20 focus:border-blue-500/50"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Select value={status} onValueChange={(value)=>setStatus(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="suspended">Suspended</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Button>
                                    <Plus className="w-4 h-4" />
                                    Add New Client
                                </Button>
                            </div>
                        </div>
                        {/* Actual Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-900/80 text-slate-400 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Client</th>
                                        <th className="px-6 py-4">Plan</th>
                                        <th className="px-6 py-4">address</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Join Date</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {clients?.filter((client)=>status==='all'?true:client.status===status).map((client) => (
                                        <tr key={client.id} className="hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                {gettingClients?<Skeleton className="w-10 h-4"/>:
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold group-hover:text-blue-400 transition-colors">{client.name}</span>
                                                    <span className="text-xs font-mono group-hover:text-blue-400 transition-colors text-slate-500">{client.email}</span>
                                                </div>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    {gettingClients?<Skeleton className="w-40 h-8"/>:
                                                    <>
                                                        <span className="text-sm font-medium text-white transition-colors">{client.plan_name}</span>
                                                    </>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {gettingClients?<Skeleton className="w-20 h-4"/>:<span className="text-sm text-slate-300">{client.address}</span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                {gettingClients?<Skeleton className="w-20 h-4"/>:<span className="text-sm text-slate-400"><StatusBadge status={client.status}/></span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                {gettingClients?<Skeleton className="w-20 h-4"/>:<span className="text-sm text-slate-400">{new Date(client.created_at).toLocaleDateString() }</span>}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-6">
                                                    <Button variant="ghost" size="1" className="h-8 w-8 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10"
                                                        >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="1" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700">
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
            </main>
        </div>
    );
}

export default ClientManagement;