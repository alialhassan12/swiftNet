import { MapContainer, TileLayer,Circle  } from "react-leaflet";
import { type LatLngExpression } from "leaflet";

export default function CoverageMap(){
    const center:LatLngExpression= [33.83460032784273, 35.52061936763378]; //Beirut center [latitude,longitude] 
    const radius=200;//2km
    return(
        <div className="h-[500px] w-full">
            <MapContainer center={center} zoom={20} className="h-full w-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle center={center} radius={radius} pathOptions={{color:"blue",fillColor:"blue",fillOpacity:0.2}} />
            </MapContainer>
        </div>
    );
}