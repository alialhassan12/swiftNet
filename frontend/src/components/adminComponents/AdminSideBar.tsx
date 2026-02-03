import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Spinner } from "@/components/ui/spinner"
import { useAuthStore } from "@/store/authStore"
import { 
    LayoutDashboard, 
    ClipboardList, 
    Users, 
    Package, 
    Map, 
    Settings, 
    LogOut 
} from "lucide-react"
import { Link } from "react-router-dom"

const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/adminDashboard" },
    { title: "Requests", icon: ClipboardList, url: "/adminDashboard/requests" },
    { title: "Clients", icon: Users, url: "/adminDashboard/clients" },
    { title: "Plans", icon: Package, url: "/adminDashboard/plans" },
    { title: "Coverage", icon: Map, url: "/adminDashboard/coverage" },
    { title: "Settings", icon: Settings, url: "/adminDashboard/settings" },
]

const AdminSideBar = () => {
    const {logout,loggingOut}=useAuthStore();
    const handleLogout=()=>{
        logout();
    }
    return (
        <Sidebar className="border-r border-slate-800 bg-slate-950 text-slate-200">
            <SidebarHeader className="flex flex-row items-center gap-3 p-4 border-b border-slate-800">
                <img src="/src/assets/logo.png" className="w-10 h-10" alt="logo" />
                <span className="text-xl font-bold tracking-tight text-white">SwiftNet</span>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-slate-500 uppercase text-xs font-semibold px-4 pt-6 pb-2">
                        Management
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link 
                                            to={item.url} 
                                            className="flex items-center gap-3 px-4 py-2 transition-colors rounded-md group"
                                        >
                                            <item.icon className="w-5 h-5 text-blue-400" />
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-slate-800">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <button 
                                className="flex items-center gap-3 px-4 py-2 w-full hover:bg-red-950/30 text-red-400 hover:text-red-300 transition-colors rounded-md group"
                                onClick={() => handleLogout()}
                            >
                                {loggingOut?<Spinner className="w-5 h-5" />:<LogOut className="w-5 h-5" />}
                                <span className="font-medium">Logout</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AdminSideBar;