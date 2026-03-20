import { Route, Routes } from "react-router-dom";
import Dashboard from "./clientPages/Dashboard";
import Support from "./clientPages/Support";

const ClientDashboard = () => {
    return (
        <div className="flex bg-slate-950 min-h-screen w-full relative">
            <div className="flex flex-col w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="support" element={<Support />} />
                </Routes>
            </div>
        </div>
    );
};

export default ClientDashboard;