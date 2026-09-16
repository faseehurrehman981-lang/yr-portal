"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet/hooks";

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
}

export default function LiveMap({ 
  driverLocation = [24.8607, 67.0011], // Default Karachi coords
  customerLocation = [24.8212, 67.0321] // Default Clifton coords
}: {
  driverLocation?: [number, number],
  customerLocation?: [number, number]
}) {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // Dynamically load leaflet library to get the icon configurations for SSR compatibility
    import("leaflet").then((leaflet) => {
      // Fix for default marker icon issues in Next.js
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
      setL(leaflet);
    });
  }, []);

  if (!L) return <div className="h-full w-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">Loading Map...</div>;

  const driverIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3204/3204121.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
  
  const customerIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  return (
    <div className="h-full w-full overflow-hidden rounded-2xl z-0">
      <MapContainer 
        center={driverLocation} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <MapUpdater center={customerLocation} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <Marker position={driverLocation} icon={driverIcon}>
          <Popup>Driver / Destination Location</Popup>
        </Marker>

        <Marker position={customerLocation} icon={customerIcon}>
          <Popup>Pickup / Customer Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
