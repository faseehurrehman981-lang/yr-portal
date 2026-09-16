import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ReceiptPage() {
  const receiptData = {
    id: "REC-YR-8921",
    date: "Sep 12, 2026",
    time: "2:15 PM",
    driverName: "Ahmed Khan",
    vehicle: "Honda Civic (ABC-789)",
    pickup: "Clifton Block 5, Karachi",
    destination: "DHA Phase 6, Karachi",
    fare: 450,
    paymentMethod: "CASH",
  };

  return (
    <main className="flex-1 flex flex-col relative bg-[#f8fafc] min-h-screen">
      <Navbar />
      
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 flex-1">
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-[#0F5C35] p-6 text-center text-white relative">
            <h1 className="text-2xl font-bold">Ride Receipt</h1>
            <p className="text-green-200 mt-1">{receiptData.date} • {receiptData.time}</p>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-center border-b border-gray-100 pb-6 mb-6">
              <div className="text-gray-500 text-sm">Receipt ID</div>
              <div className="font-bold text-gray-800">{receiptData.id}</div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#0F5C35]/10 flex items-center justify-center mt-1">📍</div>
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Pickup</div>
                  <div className="font-medium text-gray-800">{receiptData.pickup}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F37021]/10 flex items-center justify-center mt-1">🏁</div>
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Destination</div>
                  <div className="font-medium text-gray-800">{receiptData.destination}</div>
                </div>
              </div>
            </div>

            <div className="border-t border-b border-gray-100 py-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Driver Details</h3>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Name</span>
                <span className="font-medium">{receiptData.driverName}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Vehicle</span>
                <span className="font-medium">{receiptData.vehicle}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Total Fare</span>
              <span className="text-2xl font-extrabold text-[#0F5C35]">Rs {receiptData.fare}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Payment Method</span>
              <span className="bg-gray-100 px-3 py-1 rounded text-xs font-bold text-gray-600">
                {receiptData.paymentMethod}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/dashboard/history" className="text-[#0F5C35] font-bold hover:underline">
            ← Back to Ride History
          </Link>
        </div>
        
      </div>
    </main>
  );
}
