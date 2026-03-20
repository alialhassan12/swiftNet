import { useAuthStore } from "@/store/authStore";
import { useClientProfileStore } from "@/store/clientProfileStore";
import { useEffect } from "react";
import { LogOut, Activity, Zap, Headphones, MapPin, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { authUser, logout } = useAuthStore();
    const { profile, getProfile, gettingProfile } = useClientProfileStore();
    const navigate = useNavigate();

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="flex flex-col gap-6 text-slate-100">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Client Dashboard</h1>
                    <p className="text-slate-400 mt-1">Welcome back, {authUser?.name || "Client"}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate('/Dashboard/support')}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    >
                        <Headphones className="w-4 h-4" />
                        Support
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </header>

            {gettingProfile ? (
                <div className="flex items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-t-2 border-indigo-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Status Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col hover:border-slate-700 transition-colors md:col-span-1">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-200">Account Status</h2>
                            <div className={`p-2 rounded-lg ${profile?.status?.toLowerCase() === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                <Activity className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-bold capitalize">{profile?.status || 'Active'}</span>
                        </div>
                        <p className="text-slate-400 text-sm mt-3 border-t border-slate-800 pt-3">
                            Account ID: #{profile?.id || '---'}
                        </p>
                    </div>

                    {/* Plan Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:col-span-2 hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-200">Current Plan</h2>
                            <div className="bg-blue-500/10 text-blue-500 p-2 rounded-lg">
                                <Zap className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-2 mb-4">
                            <span className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
                                {profile?.plan_name || 'No Active Plan'}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-4 mt-auto">
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Email</span>
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                                    <span className="truncate">{profile?.email || authUser?.email || '---'}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Phone</span>
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                                    <span>{profile?.phone || '---'}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Address</span>
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                    <span className="truncate">{profile?.address || '---'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;