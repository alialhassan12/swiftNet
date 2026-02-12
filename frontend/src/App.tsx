import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage'
import 'aos/dist/aos.css';
import AOS from "aos";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Spinner } from "@radix-ui/themes";
import ClientDashboard from "./pages/ClientDashboard";

function App() {
  const {authUser,check,isChecking}=useAuthStore();

  useEffect(()=>{
    check()
  },[])

  if(isChecking){
    return<>
    <div className="flex items-center justify-center h-screen">
      <div className="text-2xl font-bold"><Spinner size={"3"}/></div>
    </div>
    </>
  }

  //intialize aos for the fade animation
  AOS.init({
    duration: 1000,
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={authUser?.role==="admin"?<Navigate to="/Dashboard"/>:<HomePage />} />
          <Route path="/Dashboard/*" 
            element={
              authUser?.role==="admin"?
              <AdminDashboard/>
              :authUser?.role==="client"?
              <ClientDashboard/>
              :<Navigate to="/"/>
            }></Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
