import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function DriverRegisterPage() {
  return (
    <main className="flex-1 flex flex-col relative bg-[#f8fafc] min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full border border-gray-100 my-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#F37021]">Drive with YR</h1>
            <p className="text-gray-500 mt-2">Earn money by partnering with Your Ride</p>
          </div>
          
          <form className="space-y-6">
            {/* Personal Details Section */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h2 className="text-xl font-bold text-[#0F5C35] mb-4">Personal Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F37021] outline-none" placeholder="First Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F37021] outline-none" placeholder="Last Name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F37021] outline-none" placeholder="driver@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F37021] outline-none" placeholder="+92 300 1234567" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F37021] outline-none" placeholder="••••••••" />
              </div>
            </div>

            {/* Vehicle Details Section */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h2 className="text-xl font-bold text-[#0F5C35] mb-4">Vehicle Information</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                <div className="grid grid-cols-3 gap-4">
                  <label className="cursor-pointer">
                    <input type="radio" name="vehicleType" value="MINI" className="peer sr-only" />
                    <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-[#F37021] peer-checked:bg-[#F37021]/10 text-center font-bold text-gray-700 transition-all">
                      🚗 Mini
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="vehicleType" value="RIDE" className="peer sr-only" />
                    <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-[#F37021] peer-checked:bg-[#F37021]/10 text-center font-bold text-gray-700 transition-all">
                      🚙 Ride
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="vehicleType" value="BIKE" className="peer sr-only" defaultChecked />
                    <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-[#F37021] peer-checked:bg-[#F37021]/10 text-center font-bold text-gray-700 transition-all">
                      🛵 Bike
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                  <input type="text" className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F37021] outline-none" placeholder="Toyota, Honda, etc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <input type="text" className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F37021] outline-none" placeholder="Corolla, CD70, etc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input type="text" className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F37021] outline-none" placeholder="2018" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                  <input type="text" className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F37021] outline-none" placeholder="ABC-123" />
                </div>
              </div>
            </div>
            
            <Link href="/driver/dashboard" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-[#0F5C35] hover:bg-[#0a4125] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F5C35] transition-all">
              Complete Registration
            </Link>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already a YR driver?{' '}
              <Link href="/driver/login" className="font-medium text-[#F37021] hover:text-orange-600">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
