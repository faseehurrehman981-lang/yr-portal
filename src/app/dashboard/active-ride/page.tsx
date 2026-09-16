"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import LiveMap from "@/components/LiveMap";
import InRideChat from "@/components/InRideChat";
import { toast } from "react-hot-toast";

export default function CustomerActiveRide() {
  const [rideState, setRideState] = useState<"APPROACHING" | "STARTED" | "COMPLETED">("APPROACHING");
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Mock live coordinates for demo
  const [driverLocation, setDriverLocation] = useState<[number, number]>([24.8450, 67.0250]); // Moving towards customer
  const customerLocation: [number, number] = [24.8212, 67.0321]; 

  // Simulate receiving updates via WebSockets
  useEffect(() => {
    if (rideState === "STARTED") {
      toast.success("Ride started! Have a safe journey.", { duration: 4000 });
    } else if (rideState === "COMPLETED") {
      toast.success("Ride completed! Please process your payment.", { duration: 5000 });
    }
  }, [rideState]);

  return (
    <main className="flex-1 flex flex-col relative bg-[#f8fafc] min-h-screen">
      <Navbar />
      <InRideChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} role="CUSTOMER" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-1 flex flex-col">
        <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-[#0F5C35]">Your Ride Details</h1>
            <p className="text-[#F37021] font-bold mt-1 text-lg">
              {rideState === "APPROACHING" && "🚗 Driver is 3 mins away"}
              {rideState === "STARTED" && "🏁 Heading to destination"}
              {rideState === "COMPLETED" && "✅ You have arrived!"}
            </p>
          </div>
          <div className="text-right">
            <span className="block text-xs uppercase text-gray-400 font-bold">Fare</span>
            <span className="text-xl font-extrabold text-[#0F5C35]">Rs 450</span>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          
          {/* Live Map Area */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-md border border-gray-200 relative h-full">
            <LiveMap driverLocation={driverLocation} customerLocation={customerLocation} />
          </div>
          
          {/* Driver Details Sidebar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h3 className="font-bold text-gray-800 mb-6 text-xl">Driver Info</h3>
            
            <div className="flex items-center gap-4 mb-8 bg-gray-50 p-4 rounded-xl">
               <div className="w-16 h-16 bg-[#0F5C35]/10 rounded-full flex items-center justify-center text-2xl font-bold text-[#0F5C35]">
                 AK
               </div>
               <div>
                 <h4 className="font-bold text-lg">Ahmed Khan</h4>
                 <div className="flex items-center gap-1 text-[#F37021] font-bold text-sm">
                   ⭐ 4.9 (120 rides)
                 </div>
               </div>
               <div className="ml-auto flex gap-2">
                 <button onClick={() => setIsChatOpen(true)} className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors">
                   💬
                 </button>
                 <a href="tel:+923001234567" className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors">
                    📞
                 </a>
               </div>
            </div>

            <div className="mb-8">
              <h4 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-2">Vehicle</h4>
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div>
                  <div className="font-bold text-gray-800 text-lg">Honda Civic</div>
                  <div className="text-sm text-gray-500">White • 2021</div>
                </div>
                <div className="bg-[#0F5C35] text-white px-3 py-1 rounded font-bold tracking-widest">
                  ABC-789
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <button className="w-full py-4 border-2 border-red-500 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-all text-lg">
                Cancel Ride
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
