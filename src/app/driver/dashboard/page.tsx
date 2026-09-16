"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function DriverDashboardPage() {
  const [isOnline, setIsOnline] = useState(false);
  
  // Mock data for requested rides
  const incomingRides = [
    {
      id: "1",
      customer: "John Doe",
      pickup: "Clifton Block 5",
      destination: "DHA Phase 6",
      fare: "450",
      type: "🚗 Mini",
      distance: "2.5 km away"
    },
    {
      id: "2",
      customer: "Sarah Khan",
      pickup: "Saddar",
      destination: "Tariq Road",
      fare: "300",
      type: "🛵 Bike",
      distance: "1.1 km away"
    }
  ];

  return (
    <main className="flex-1 flex flex-col relative bg-[#f8fafc] min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0F5C35]">Driver Dashboard</h1>
            <p className="text-gray-500">Welcome back, Partner.</p>
          </div>
          
          {/* Online/Offline Toggle */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <span className={`font-bold ${isOnline ? 'text-[#0F5C35]' : 'text-gray-400'}`}>
              {isOnline ? "You are ONLINE" : "You are OFFLINE"}
            </span>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${isOnline ? 'bg-[#0F5C35]' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isOnline ? 'translate-x-9' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Area - Incoming Requests */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F37021] opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-[#F37021]' : 'bg-gray-400'}`}></span>
              </span>
              Incoming Requests
            </h2>
            
            {!isOnline ? (
              <div className="bg-gray-100 p-12 rounded-2xl text-center border border-gray-200">
                <div className="text-5xl mb-4 grayscale opacity-50">😴</div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">You're currently offline</h3>
                <p className="text-gray-500">Go online to start receiving ride requests and earning.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {incomingRides.map(ride => (
                  <div key={ride.id} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#F37021] hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{ride.customer}</h3>
                        <p className="text-sm text-gray-500">{ride.distance}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-[#0F5C35] text-xl">Rs {ride.fare}</div>
                        <div className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">{ride.type}</div>
                      </div>
                    </div>
                    
                    <div className="relative mb-6">
                      <div className="absolute top-0 bottom-0 left-2 flex flex-col items-center justify-center py-2">
                        <div className="w-2 h-2 rounded-full bg-[#0F5C35]"></div>
                        <div className="w-0.5 h-full bg-gray-300 my-1"></div>
                        <div className="w-2 h-2 rounded-full bg-[#F37021]"></div>
                      </div>
                      
                      <div className="pl-8 space-y-3 text-sm">
                        <div>
                          <span className="text-gray-500 block text-xs uppercase font-bold">Pickup</span>
                          <span className="font-medium">{ride.pickup}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block text-xs uppercase font-bold">Destination</span>
                          <span className="font-medium">{ride.destination}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                        Reject
                      </button>
                      <button className="flex-1 py-3 bg-[#0F5C35] text-white font-bold rounded-xl shadow-md hover:bg-[#0a4125] transition-colors">
                        Accept Ride
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Sidebar - Driver Stats */}
          <div className="space-y-6">
            <div className="bg-[#0F5C35] text-white p-6 rounded-2xl shadow-md">
              <h3 className="font-bold mb-2 text-gray-200">Today's Earnings</h3>
              <div className="text-4xl font-extrabold mb-1">Rs 2,450</div>
              <p className="text-sm text-green-200 mb-6">6 Rides Completed</p>
              
              <div className="bg-black/20 p-4 rounded-xl">
                <div className="flex justify-between text-sm mb-2">
                  <span>Wallet Balance</span>
                  <span className="font-bold">Rs 15,200</span>
                </div>
                <button className="w-full py-2 bg-white text-[#0F5C35] rounded-lg text-sm font-bold mt-2 hover:bg-gray-100 transition-colors">
                  Withdraw Funds
                </button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Your Vehicle</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                  🛵
                </div>
                <div>
                  <h4 className="font-bold">Honda CD70</h4>
                  <p className="text-sm text-gray-500">KHI-8921 • 2021</p>
                  <p className="text-xs text-green-600 font-bold mt-1">✓ Approved</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
