import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./adminPages/Dashboard";
import AdminSideBar from "@/components/adminComponents/AdminSideBar";
import Requests from "./adminPages/Requests";
import Plans from "./adminPages/Plans";

const AdminDashboard = () => {
    return (
        <SidebarProvider>
            <div className="flex bg-slate-950 min-h-screen w-full">
                <AdminSideBar />
                <SidebarInset className="bg-slate-950 flex flex-col w-full">
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="requests" element={<Requests />} />
                        <Route path="plans" element={<Plans />}/>
                    </Routes>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
export default AdminDashboard;