import CoverageMap from "../components/CoverageMap";
import Navbar from "../components/Navbar";

export default function HomePage(){
    return(
        <>
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
            <div className="ml-20 mr-20">
                <div id="coverage-map" data-aos="fade-up" className="w-full">
                    <h2 className="text-2xl font-bold text-white tracking-wider">Coverage Map</h2>
                </div>
            </div>
            <CoverageMap />
        </>
    );
}