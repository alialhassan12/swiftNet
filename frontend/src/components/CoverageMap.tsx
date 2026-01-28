import { MapContainer, TileLayer,Circle  } from "react-leaflet";
import { type LatLngExpression } from "leaflet";

export default function CoverageMap({ className = "" }: { className?: string }) {
    const center: LatLngExpression = [33.83460032784273, 35.52061936763378]; //Beirut center
    const radius = 200; //2km

    return (
        <div className={`h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 ${className}`}>
            <MapContainer center={center} zoom={15} className="h-full w-full outline-none">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle 
                    center={center} 
                    radius={radius} 
                    pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.2 }} 
                />
            </MapContainer>
        </div>
    );
}