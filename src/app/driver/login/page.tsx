import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function DriverLoginPage() {
  return (
    <main className="flex-1 flex flex-col relative bg-[#f8fafc] min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0F5C35]">Driver Login</h1>
            <p className="text-gray-500 mt-2">Access your YR driver dashboard</p>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F5C35] focus:bg-white outline-none transition-all"
                placeholder="driver@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F5C35] focus:bg-white outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-[#0F5C35] focus:ring-[#0F5C35] border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <Link href="/forgot-password" className="text-sm font-medium text-[#F37021] hover:text-orange-600">
                Forgot password?
              </Link>
            </div>
            
            <Link href="/driver/dashboard" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-[#0F5C35] hover:bg-[#0a4125] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F5C35] transition-all">
              Sign in as Driver
            </Link>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Want to drive for YR?{' '}
              <Link href="/driver/register" className="font-medium text-[#F37021] hover:text-orange-600">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
