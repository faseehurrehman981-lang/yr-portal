import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col relative bg-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-2 font-serif">
              Your Ride
            </h1>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 font-serif">
              Your <span className="text-[#F37021]">Way</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-200 font-medium max-w-2xl mx-auto">
              Helping everyone get to their destination safely. Fast pickups, verified drivers, and affordable fares.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="w-full sm:w-auto px-8 py-3.5 bg-[#F37021] text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition-all">
                Book a Ride Now
              </Link>
              <Link href="/about" className="w-full sm:w-auto px-8 py-3.5 bg-[#F37021] text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side text */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[2px] bg-[#F37021]"></div>
                <span className="text-[#F37021] font-bold tracking-widest text-sm uppercase">For Daily Commuters</span>
              </div>
              <h2 className="text-5xl font-bold text-[#1a2f24] mb-2 leading-tight">Get There, Safely</h2>
              <h2 className="text-5xl font-bold text-[#1a2f24] mb-4 leading-tight">With Us</h2>
              <h2 className="text-5xl font-bold text-[#F37021] mb-8 leading-tight">Everytime</h2>
              
              <div className="w-16 h-1 bg-[#F37021] mb-8"></div>
              
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Distance shouldn't stop you from reaching your goals. YR is a concierge transportation service, managing rides and logistics for you.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether going to the office or handling day-to-day needs, our team acts on your behalf. You always have someone reliable looking after your journey.
              </p>
            </div>
            
            {/* Right side 4-card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="bg-[#1a2f24] p-8 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center min-h-[260px]">
                <div className="w-14 h-14 rounded-full border border-gray-600 flex items-center justify-center mb-6 text-[#F37021]">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">Always Fast</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Live updates keep you connected without being overwhelmed.</p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-[#1a2f24] p-8 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center min-h-[260px]">
                <div className="w-14 h-14 rounded-full border border-gray-600 flex items-center justify-center mb-6 text-[#F37021]">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">Always Available</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Round-the-clock rides and support for you and your family.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#1a2f24] p-8 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center min-h-[260px]">
                <div className="w-14 h-14 rounded-full border border-gray-600 flex items-center justify-center mb-6 text-[#F37021]">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">One Dedicated Team</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Every ride and every need is managed by a coordinated team.</p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#1a2f24] p-8 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center min-h-[260px]">
                <div className="w-14 h-14 rounded-full border border-gray-600 flex items-center justify-center mb-6 text-[#F37021]">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">Peace of Mind</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Stop worrying — your family is in trusted hands.</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
