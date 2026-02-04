import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuthStore } from "../../store/authStore"

const Dashboard = () => {
    const {authUser}=useAuthStore();
    return (
        <div data-aos="fade-up">
            {/* Header for mobile */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-4 md:hidden">
                <SidebarTrigger className="text-white hover:text-blue-400 transition-colors" />
                <span className="text-white font-bold">SwiftNet Admin</span>
            </header>
            
            <main className="flex-1 p-6 text-slate-200">
                <div className="max-w-4xl">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome, {authUser?.name}</h1>
                    <p className="text-slate-400">Role: <span className="text-blue-400 font-medium capitalize">{authUser?.role}</span></p>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
                            <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
                            <p className="text-sm text-slate-500">No recent activity to show.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
                            <h2 className="text-lg font-semibold mb-2">System Status</h2>
                            <p className="text-sm text-slate-500">All systems operational.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default Dashboard;
