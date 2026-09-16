"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import LocationInput from "@/components/LocationInput";
import LiveMap from "@/components/LiveMap";

export default function DashboardPage() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  
  const [pickupCoords, setPickupCoords] = useState<[number, number]>([24.8212, 67.0321]); // Default customer
  const [destCoords, setDestCoords] = useState<[number, number]>([24.8607, 67.0011]);     // Default driver

  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPickup("Current Location");
        setPickupCoords([pos.coords.latitude, pos.coords.longitude]);
      }, (err) => {
        alert("Could not access location.");
      });
    }
  };

  return (
    <main className="flex-1 flex flex-col relative bg-[#f4f7f5] min-h-screen font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
        {/* Welcome Banner */}
        <div className="bg-[#1a2f24] rounded-3xl p-10 mb-10 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#F37021] rounded-full mix-blend-screen filter blur-[100px] opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-[#2a4a3a] rounded-full filter blur-[80px] opacity-40 transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Welcome to Your Ride! 👋</h1>
            <p className="text-lg text-gray-300 max-w-3xl mb-6 leading-relaxed font-medium">
              We are committed to providing you with the fastest, safest, and most reliable transportation and delivery services. Enjoy your premium journey with us.
            </p>
            <p className="font-semibold text-[#F37021] tracking-wide">— Sabeeh & Faseeh, CEOs</p>
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Action Area - Book a Ride */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-[#1a2f24]">Book a Ride</h2>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold border border-green-200">Online</span>
              </div>
              
              <form className="space-y-6">
                <div className="relative bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="absolute top-6 bottom-6 left-10 flex flex-col items-center justify-center z-10">
                    <div className="w-4 h-4 rounded-full bg-[#1a2f24] border-4 border-white shadow-sm"></div>
                    <div className="w-1 h-full bg-gray-300 my-1 rounded-full"></div>
                    <div className="w-4 h-4 rounded-full bg-[#F37021] border-4 border-white shadow-sm"></div>
                  </div>
                  
                  <div className="pl-14 space-y-5">
                    <LocationInput 
                      placeholder="Enter Pickup Location" 
                      value={pickup}
                      onChange={setPickup}
                      onSelectLocation={(lat, lon, name) => {
                        setPickupCoords([lat, lon]);
                      }}
                      iconColor="#1a2f24"
                      onUseCurrentLocation={handleUseCurrentLocation}
                    />
                    <LocationInput 
                      placeholder="Enter Destination" 
                      value={destination}
                      onChange={setDestination}
                      onSelectLocation={(lat, lon, name) => {
                        setDestCoords([lat, lon]);
                      }}
                      iconColor="#F37021"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Select Vehicle</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button type="button" className="p-5 border-2 border-[#1a2f24] bg-[#1a2f24]/5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-[#1a2f24]/10 transition-all shadow-sm">
                      <span className="text-3xl">🚗</span>
                      <div className="text-center">
                        <span className="block font-bold text-[#1a2f24] text-lg">YR Mini</span>
                        <span className="text-sm text-gray-600 font-medium">Est. Rs 350</span>
                      </div>
                    </button>
                    <button type="button" className="p-5 border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#1a2f24] transition-all grayscale hover:grayscale-0 hover:shadow-md bg-white">
                      <span className="text-3xl">🚙</span>
                      <div className="text-center">
                        <span className="block font-bold text-gray-800 text-lg">YR Ride</span>
                        <span className="text-sm text-gray-500">Est. Rs 500</span>
                      </div>
                    </button>
                    <button type="button" className="p-5 border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#1a2f24] transition-all grayscale hover:grayscale-0 hover:shadow-md bg-white">
                      <span className="text-3xl">🛵</span>
                      <div className="text-center">
                        <span className="block font-bold text-gray-800 text-lg">YR Bike</span>
                        <span className="text-sm text-gray-500">Est. Rs 200</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                <button type="button" className="w-full mt-4 py-4 bg-[#F37021] text-white font-bold rounded-2xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/50 transition-all text-xl transform hover:-translate-y-1">
                  Confirm Booking
                </button>
              </form>
            </div>
            
            {/* Live Map */}
            <div className="bg-white p-2 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <div className="bg-gray-100 h-[350px] rounded-2xl overflow-hidden relative border border-gray-200">
                 <LiveMap driverLocation={destCoords} customerLocation={pickupCoords} />
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <h3 className="text-xl font-bold text-[#1a2f24] mb-6">Recent Rides</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-[#1a2f24]/10 text-[#1a2f24] rounded-full flex items-center justify-center shadow-sm">
                    🚙
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Clifton to DHA Phase 6</p>
                    <p className="text-sm text-gray-500 font-medium mt-0.5">Yesterday, 4:30 PM</p>
                  </div>
                  <div className="font-extrabold text-[#F37021]">Rs 450</div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-[#1a2f24]/10 text-[#1a2f24] rounded-full flex items-center justify-center shadow-sm">
                    🛵
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Saddar to Tariq Road</p>
                    <p className="text-sm text-gray-500 font-medium mt-0.5">Mon, 10:15 AM</p>
                  </div>
                  <div className="font-extrabold text-[#F37021]">Rs 180</div>
                </div>
              </div>
              <button className="w-full text-center mt-6 py-3 rounded-xl border-2 border-gray-100 text-sm font-bold text-[#1a2f24] hover:bg-gray-50 hover:border-gray-200 transition-all">
                View All History
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-[#1a2f24] to-[#254233] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#F37021] opacity-20 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-300 uppercase tracking-widest text-sm">YR Wallet</h3>
                  <svg className="w-6 h-6 text-[#F37021]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="text-5xl font-extrabold mb-8 tracking-tight">Rs 1,250<span className="text-2xl text-gray-400">.00</span></div>
                <button className="w-full py-4 bg-[#F37021] hover:bg-orange-600 rounded-xl text-white font-bold transition-colors shadow-lg">
                  Top Up Balance
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
