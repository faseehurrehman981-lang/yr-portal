import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function RideHistoryPage() {
  const historyData = [
    {
      id: "REC-YR-8921",
      date: "Sep 12, 2026",
      status: "COMPLETED",
      pickup: "Clifton Block 5",
      destination: "DHA Phase 6",
      fare: 450,
      vehicle: "🚗 Mini"
    },
    {
      id: "REC-YR-7820",
      date: "Sep 10, 2026",
      status: "COMPLETED",
      pickup: "Saddar",
      destination: "Tariq Road",
      fare: 250,
      vehicle: "🛵 Bike"
    },
    {
      id: "REC-YR-7715",
      date: "Sep 05, 2026",
      status: "CANCELLED",
      pickup: "Gulshan-e-Iqbal",
      destination: "Karsaz",
      fare: 0,
      vehicle: "🚙 Ride"
    }
  ];

  return (
    <main className="flex-1 flex flex-col relative bg-[#f8fafc] min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0F5C35]">Your Ride History</h1>
            <p className="text-gray-500">View past trips and receipts</p>
          </div>
          <Link href="/dashboard" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors">
            Back to Dashboard
          </Link>
        </div>
        
        <div className="space-y-4">
          {historyData.map((ride) => (
            <div key={ride.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-gray-800 text-lg">{ride.date}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${ride.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {ride.status}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-800">From:</span> {ride.pickup}
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="font-medium text-gray-800">To:</span> {ride.destination}
                </div>
              </div>
              
              <div className="text-right sm:text-center w-full sm:w-auto flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-2">
                <div className="text-left sm:text-right">
                  <div className="font-extrabold text-[#0F5C35] text-xl">Rs {ride.fare}</div>
                  <div className="text-xs text-gray-500">{ride.vehicle}</div>
                </div>
                
                {ride.status === 'COMPLETED' && (
                  <Link href={`/dashboard/receipt/${ride.id}`} className="px-4 py-2 text-sm bg-[#F37021]/10 text-[#F37021] font-bold rounded-lg hover:bg-[#F37021]/20 transition-colors">
                    View Receipt
                  </Link>
                )}
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
