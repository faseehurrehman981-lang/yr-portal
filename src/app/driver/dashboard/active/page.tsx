"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import LiveMap from "@/components/LiveMap";
import InRideChat from "@/components/InRideChat";
import { toast } from "react-hot-toast";

export default function DriverActiveRide() {
  const [rideState, setRideState] = useState<"APPROACHING" | "STARTED" | "COMPLETED">("APPROACHING");
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Mock live coordinates for demo
  const [driverLocation, setDriverLocation] = useState<[number, number]>([24.8450, 67.0250]); // Moving towards customer
  const customerLocation: [number, number] = [24.8212, 67.0321]; 

  const handleNextState = () => {
    if (rideState === "APPROACHING") {
      setRideState("STARTED");
      toast.success("Ride Started. Customer notified.");
    }
    else if (rideState === "STARTED") {
      setRideState("COMPLETED");
      toast.success("Ride Completed.");
    }
  };

  return (
    <main className="flex-1 flex flex-col relative bg-[#f8fafc] min-h-screen">
      <Navbar />
      <InRideChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} role="DRIVER" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-1 flex flex-col">
        <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-[#0F5C35]">Active Ride</h1>
            <p className="text-gray-500 font-medium mt-1 text-sm">
              {rideState === "APPROACHING" && "🚗 You are approaching the pickup location"}
              {rideState === "STARTED" && "🏁 Ride in progress. Navigating to destination"}
              {rideState === "COMPLETED" && "✅ Ride completed successfully!"}
            </p>
          </div>
          <div className="text-right">
            <span className="block text-xs uppercase text-gray-400 font-bold">Fare</span>
            <span className="text-xl font-extrabold text-[#F37021]">Rs 450</span>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          
          {/* Live Map Area */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-md border border-gray-200 relative h-full">
            <LiveMap driverLocation={driverLocation} customerLocation={customerLocation} />
            
            {/* Status Overlay */}
            <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 z-10 flex justify-between items-center">
              <div>
                <h3 className="font-bold">Customer: John Doe</h3>
                <p className="text-xs text-gray-500">Contact: +92 300 9876543</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsChatOpen(true)} className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors">
                  💬
                </button>
                <a href="tel:+923009876543" className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors">
                  📞
                </a>
              </div>
            </div>
          </div>
          
          {/* Action Sidebar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h3 className="font-bold text-gray-800 mb-6 text-xl">Ride Details</h3>
            
            <div className="relative mb-8">
              <div className="absolute top-0 bottom-0 left-2 flex flex-col items-center justify-center py-2">
                <div className="w-3 h-3 rounded-full bg-[#0F5C35]"></div>
                <div className="w-0.5 h-full bg-gray-300 my-1"></div>
                <div className="w-3 h-3 rounded-full bg-[#F37021]"></div>
              </div>
              
              <div className="pl-8 space-y-6">
                <div>
                  <span className="text-gray-500 block text-xs uppercase font-bold tracking-wider">Pickup</span>
                  <span className="font-medium text-lg">Clifton Block 5, Karachi</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs uppercase font-bold tracking-wider">Destination</span>
                  <span className="font-medium text-lg">DHA Phase 6, Karachi</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              {rideState !== "COMPLETED" ? (
                <button 
                  onClick={handleNextState}
                  className="w-full py-4 bg-[#F37021] text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 hover:scale-[1.02] transition-all text-lg"
                >
                  {rideState === "APPROACHING" ? "I Have Arrived & Start Ride" : "Complete Ride"}
                </button>
              ) : (
                <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100">
                  <h3 className="text-green-700 font-bold text-xl mb-2">Ride Finished</h3>
                  <p className="text-green-600 text-sm">Amount added to wallet.</p>
                  <button className="mt-4 px-6 py-2 bg-white text-green-700 font-bold rounded shadow-sm hover:bg-gray-50 border border-green-200">
                    Find Next Ride
                  </button>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
