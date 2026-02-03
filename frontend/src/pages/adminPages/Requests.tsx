import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
    ClipboardList, 
    Search, 
    Filter, 
    MoreVertical, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    Eye,
    ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Dummy data for the design
const requests = [
    {
        id: "REQ-001",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
        plan: "Premium Fiber",
        status: "pending",
        date: "2024-02-03",
        address: "123 Main St, New York"
    },
    {
        id: "REQ-002",
        name: "Alice Smith",
        email: "alice@world.com",
        phone: "+1 987 654 321",
        plan: "Standard Docsis",
        status: "approved",
        date: "2024-02-02",
        address: "456 Oak Ave, Los Angeles"
    },
    {
        id: "REQ-003",
        name: "Robert Brown",
        email: "bob@tech.io",
        phone: "+1 555 012 3456",
        plan: "Business Ultra",
        status: "rejected",
        date: "2024-02-01",
        address: "789 Pine Rd, Chicago"
    },
    {
        id: "REQ-004",
        name: "Emily White",
        email: "emily@gmail.com",
        phone: "+1 444 222 3333",
        plan: "Home Starter",
        status: "pending",
        date: "2024-01-31",
        address: "321 Elm St, Miami"
    }
];

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        rejected: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    };

    const icons = {
        pending: <Clock className="w-3.5 h-3.5 mr-1" />,
        approved: <CheckCircle2 className="w-3.5 h-3.5 mr-1" />,
        rejected: <XCircle className="w-3.5 h-3.5 mr-1" />,
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
            {icons[status as keyof typeof icons]}
            <span className="capitalize">{status}</span>
        </span>
    );
};

const Requests = () => {
    return (
        <div className="flex flex-col h-full">
            {/* Header for mobile */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4 md:hidden">
                <SidebarTrigger className="text-white hover:text-blue-400 transition-colors" />
                <span className="text-white font-bold">Requests Management</span>
            </header>

            <main className="flex-1 p-6 overflow-auto bg-slate-950">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Page Title & Actions */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Installation Requests</h1>
                            <p className="text-slate-400 mt-1 text-sm">Review and manage new service applications</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
                                Export CSV
                            </Button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "Total Requests", value: "128", icon: ClipboardList, color: "text-blue-400", bg: "bg-blue-400/10" },
                            { label: "Pending", value: "45", icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10" },
                            { label: "Approved Today", value: "12", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                            { label: "Completion Rate", value: "84%", icon: ArrowUpRight, color: "text-purple-400", bg: "bg-purple-400/10" },
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
                                <select className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-slate-700">
                                    <option>All Status</option>
                                    <option>Pending</option>
                                    <option>Approved</option>
                                    <option>Rejected</option>
                                </select>
                            </div>
                        </div>

                        {/* Actual Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-900/80 text-slate-400 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Request ID</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Service Plan</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {requests.map((req) => (
                                        <tr key={req.id} className="hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-mono text-slate-500">#{req.id}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{req.name}</span>
                                                    <span className="text-xs text-slate-500">{req.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-300">{req.plan}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-400">{req.date}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={req.status} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
                            <span className="text-sm text-slate-500">Showing 1 to 4 of 128 entries</span>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-slate-800 bg-slate-950 text-slate-400 disabled:opacity-50" disabled>Previous</Button>
                                <Button variant="outline" size="sm" className="border-slate-800 bg-slate-950 text-slate-400">Next</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Requests;