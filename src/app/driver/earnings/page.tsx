"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function DriverEarningsPage() {
  const earningsData = {
    today: 2450,
    week: 15200,
    month: 52000,
    totalRides: 142,
    rating: 4.9,
    recentTransactions: [
      { id: "1", date: "Today", type: "Ride Fare", amount: 450, commision: 67.5, net: 382.5 },
      { id: "2", date: "Today", type: "Ride Fare", amount: 300, commision: 45, net: 255 },
      { id: "3", date: "Yesterday", type: "Ride Fare", amount: 800, commision: 120, net: 680 },
    ]
  };

  return (
    <main className="flex-1 flex flex-col relative bg-[#f8fafc] min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0F5C35]">Earnings Dashboard</h1>
            <p className="text-gray-500">Track your performance and payouts</p>
          </div>
          <Link href="/driver/dashboard" className="px-4 py-2 border border-[#0F5C35] text-[#0F5C35] font-bold rounded-lg hover:bg-[#0F5C35]/5 transition-colors">
            Back to Map
          </Link>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0F5C35] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#F37021] rounded-full mix-blend-multiply opacity-20 filter blur-xl transform translate-x-1/2 -translate-y-1/2"></div>
            <h3 className="font-bold text-gray-200 mb-2 relative z-10">Today's Earnings</h3>
            <div className="text-4xl font-extrabold relative z-10">Rs {earningsData.today}</div>
          </div>
          
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-gray-500 mb-2 uppercase text-xs tracking-wider">This Week</h3>
            <div className="text-3xl font-extrabold text-gray-800">Rs {earningsData.week}</div>
          </div>
          
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-500 mb-1 uppercase text-xs tracking-wider">Total Rides</h3>
              <div className="text-2xl font-extrabold text-gray-800">{earningsData.totalRides}</div>
            </div>
            <div className="text-right">
              <h3 className="font-bold text-gray-500 mb-1 uppercase text-xs tracking-wider">Rating</h3>
              <div className="text-2xl font-extrabold text-[#F37021]">⭐ {earningsData.rating}</div>
            </div>
          </div>
        </div>
        
        {/* Breakdown & History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                  <tr>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Type</th>
                    <th className="p-4 font-semibold">Gross Fare</th>
                    <th className="p-4 font-semibold">YR Fee (15%)</th>
                    <th className="p-4 font-semibold text-right text-[#0F5C35]">Net Earnings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {earningsData.recentTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm text-gray-600">{tx.date}</td>
                      <td className="p-4 text-sm font-medium">{tx.type}</td>
                      <td className="p-4 text-sm">Rs {tx.amount}</td>
                      <td className="p-4 text-sm text-red-500">-Rs {tx.commision}</td>
                      <td className="p-4 text-right font-bold text-[#0F5C35]">Rs {tx.net}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Wallet & Payouts</h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-gray-500 text-sm mb-1">Available Balance</div>
              <div className="text-3xl font-extrabold text-[#0F5C35] mb-6">Rs {earningsData.week}</div>
              
              <button className="w-full py-3 bg-[#F37021] text-white font-bold rounded-xl shadow-md hover:bg-orange-600 transition-colors mb-4">
                Request Payout
              </button>
              
              <div className="text-xs text-gray-500 text-center">
                Payouts are processed within 24-48 hours to your registered bank account.
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
