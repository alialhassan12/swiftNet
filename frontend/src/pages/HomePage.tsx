import { Button, Dialog, Text, TextArea, TextField } from "@radix-ui/themes";
import CoverageMap from "../components/CoverageMap";
import Navbar from "../components/Navbar";
import { Mail, PersonStandingIcon, Send, SendHorizonal, User } from "lucide-react";
import Footer from "../components/Footer";
import RequestForm from "../components/RequestForm";
import { Alert, Slide, Snackbar } from "@mui/material";
import { useState } from "react";
import { usePlanStore } from "../store/planStore";
import { useEffect } from "react";

export default function HomePage(){
    const [openPlan,setOpenPlan]=useState<string | null>(null);
    const[openSnackBar,setOpenSnackBar]=useState<boolean>(false);
    const {plans,getPlans}=usePlanStore();

    useEffect(() => {
        getPlans();
    }, []);

    return(
        <div className="bg-slate-950">  
            <Navbar />
            {/* Hero Section */}
            <div data-aos="fade-up" className="relative min-h-screen">

                {/* Background Image Container */}
                <div 
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: "url('/src/assets/hero-wave.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Gradient overlay for better text contrast */}
                    <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/20 to-black/80" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center text-center h-[calc(100vh-80px)] px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl mb-6">
                        Fast & Reliable <br />
                        Internet for <span className="text-blue-500">Your Home</span>
                    </h1>
                    
                    <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mb-10 drop-shadow-md font-light leading-relaxed">
                        Experience buffer-free streaming, seamless gaming, and lightning-fast downloads with SwiftNet's next-gen fiber network.
                    </p>

                    <button className="bg-white text-[#0f172a] hover:bg-gray-200 font-bold text-lg uppercase py-4 px-12 rounded shadow-2xl transition transform hover:scale-105 active:scale-95 tracking-wide cursor-pointer">
                        Check Availability
                    </button>
                    
                </div>
            </div>
            {/* Coverage Map section*/}
            <section id="coverage-map" className="relative py-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Text Content */}
                    <div data-aos="fade-right" className="space-y-8">
                        <div className="inline-block">
                            <span className="text-blue-500 font-bold tracking-wider uppercase text-sm bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                                Network Coverage
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Seamless Connectivity <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600">
                                Across the City
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                            Our advanced fiber-optic network currently covers the greater downtown area, expanding daily. 
                            Check our interactive map to see if SwiftNet is available at your location.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-lg shadow-blue-600/25 cursor-pointer">
                                Check My Address
                            </button>
                            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition border border-slate-700 cursor-pointer">
                                View Full Map
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                            <div>
                                <h4 className="text-3xl font-bold text-white">99.9%</h4>
                                <p className="text-gray-500 text-sm">Uptime Guarantee</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-white">50+</h4>
                                <p className="text-gray-500 text-sm">Neighborhoods Covered</p>
                            </div>
                        </div>
                    </div>

                    {/* Map Visual */}
                    <div data-aos="fade-left" className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative rounded-2xl p-2 border border-white/10">
                            <CoverageMap className="h-[400px] md:h-[500px]" />
                            
                            {/* Floating Card */}
                            <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl hidden md:flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Current Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <p className="text-white font-medium">Network Operational</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-blue-400">10 Gbps</p>
                                    <p className="text-xs text-gray-400">Max Speed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Plans Section */}
            <div id="plans"  className=" px-4">
                {/* Text */}
                <div data-aos="fade-up" className="space-y-5">
                    <div className="inline-block">
                        <span className="text-blue-500 font-bold tracking-wider uppercase text-sm bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                            Featured Internet Plans
                        </span>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        Choose the speed that<br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600">fits your life style</span>
                    </div>
                </div>
                {/* cards */}
                <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto">
                    {plans.map((plan)=>(
                        <div key={plan.id} className={`bg-slate-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:border-blue-500/30 transition duration-300 flex flex-col relative group overflow-hidden ${!plan.is_active ? 'grayscale opacity-75 cursor-not-allowed' : ''}`}>
                            {!plan.is_active && (
                                <div className="absolute top-4 right-4 z-20">
                                    <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-3 py-1 rounded-full border border-red-500/30 uppercase tracking-widest backdrop-blur-md">
                                        Deactivated
                                    </span>
                                </div>
                            )}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition group-hover:bg-blue-500/20"></div>
                                <h3 className="text-xl font-medium text-gray-300 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                                    <span className="text-gray-500">/mo</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                    {plan.description}
                                </p>
                            
                                <div className="space-y-4 mb-8 flex-1">
                                    {[plan.speed,plan.data,"Basic Support", "Free Router"].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                                            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                                <Dialog.Root open={openPlan === plan.name} onOpenChange={(open)=>setOpenPlan(open ? plan.name : null)}>
                                    <Dialog.Trigger>
                                        <Button 
                                            variant="outline" 
                                            size={"4"} 
                                            className={`w-full transition-colors! border-white/20! text-white! ${plan.is_active ? 'cursor-pointer hover:bg-white/5' : 'cursor-not-allowed opacity-50'}`}
                                            disabled={!plan.is_active}
                                        >
                                            {plan.is_active ? `Choose ${plan.name}` : 'Currently Unavailable'}
                                        </Button>
                                    </Dialog.Trigger>
                                    {plan.is_active && (
                                        <RequestForm plan={plan} setOpenSnackBar={()=>setOpenSnackBar(true)} onSuccess={()=>setOpenPlan(null)}/>
                                    )}
                                </Dialog.Root>
                        </div>
                    ))}
                </div>
            </div>
            {/* contact section */}
            <div id="contact" className="px-4 py-24">
                <div data-aos="fade-up" className="space-y-5">
                    <div className="inline-block">
                        <span className="text-blue-500 font-bold tracking-wider uppercase text-sm bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                            Get in Touch
                        </span>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        Have a Question or need technical support?<br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600">Our team is here to help</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                FullName
                            </Text>
                            <TextField.Root
                                name="fullname"
                                type="text"
                                placeholder="Enter your Name"
                            >
                                <TextField.Slot><User size={"16"}/></TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Email
                            </Text>
                            <TextField.Root
                                name="email"
                                type="email"
                                placeholder="Enter your Email"
                            >
                                <TextField.Slot><Mail size={"16"}/></TextField.Slot>
                            </TextField.Root>
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Your Message
                            </Text>
                            <TextArea placeholder="How Can we Help You?" size={"3"} />
                        </label>
                        <Button size={"3"}>Send Message<Send size={"20"}/></Button>
                    </div>
                </div>
            </div>
            <Snackbar 
                open={openSnackBar} 
                autoHideDuration={6000} 
                onClose={()=>setOpenSnackBar(false)}
                anchorOrigin={{vertical:"bottom",horizontal:"right"}}
                slots={{transition:Slide}}
                >
                <Alert
                    onClose={()=>setOpenSnackBar(false)}
                    severity="success"

                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Your request has been submitted successfully! Wait admin approval
                </Alert>
            </Snackbar>
            <Footer/>
        </div>
    );
}