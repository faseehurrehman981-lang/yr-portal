"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "ONLINE">("CASH");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const fareDetails = {
    baseFare: 150,
    distanceFare: 250, // For 5km
    timeFare: 50,
    discount: 0,
    total: 450
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API call to /api/payments/process
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 1500);
  };

  return (
    <main className="flex-1 flex flex-col relative bg-[#f8fafc] min-h-screen">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 flex-1">
        
        {isPaid ? (
          <div className="bg-white p-10 rounded-2xl shadow-xl text-center border border-gray-100 max-w-xl mx-auto mt-12">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              ✅
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
            <p className="text-gray-500 mb-8">Thank you for riding with YR. Your payment of Rs {fareDetails.total} has been processed.</p>
            
            <div className="flex flex-col gap-4">
              <Link href="/dashboard/receipt/123" className="w-full py-4 bg-[#0F5C35] text-white font-bold rounded-xl shadow-md hover:bg-[#0a4125] transition-colors">
                View E-Receipt
              </Link>
              <Link href="/dashboard" className="w-full py-4 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                Return to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-[#0F5C35] p-6 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F37021] rounded-full mix-blend-multiply opacity-20 filter blur-2xl transform translate-x-10 -translate-y-10"></div>
              <h1 className="text-2xl font-bold relative z-10">Checkout</h1>
              <p className="text-green-100 relative z-10 text-sm mt-1">Clifton to DHA Phase 6</p>
            </div>
            
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Fare Breakdown</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Base Fare</span>
                  <span>Rs {fareDetails.baseFare}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Distance (5 km)</span>
                  <span>Rs {fareDetails.distanceFare}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Time (15 mins)</span>
                  <span>Rs {fareDetails.timeFare}</span>
                </div>
                <div className="w-full h-px bg-gray-200 my-4"></div>
                <div className="flex justify-between text-xl font-extrabold text-[#0F5C35]">
                  <span>Total Amount</span>
                  <span>Rs {fareDetails.total}</span>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <label className="cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="CASH" 
                    className="peer sr-only" 
                    checked={paymentMethod === "CASH"}
                    onChange={() => setPaymentMethod("CASH")}
                  />
                  <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-[#F37021] peer-checked:bg-[#F37021]/10 text-center font-bold text-gray-700 transition-all">
                    💵 Cash
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="ONLINE" 
                    className="peer sr-only" 
                    checked={paymentMethod === "ONLINE"}
                    onChange={() => setPaymentMethod("ONLINE")}
                  />
                  <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-[#F37021] peer-checked:bg-[#F37021]/10 text-center font-bold text-gray-700 transition-all">
                    💳 Card / Online
                  </div>
                </label>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 bg-[#F37021] text-white font-bold rounded-xl shadow-md hover:bg-orange-600 transition-colors disabled:opacity-70 text-lg flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Pay Rs ${fareDetails.total}`
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
