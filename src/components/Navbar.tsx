"use client";

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-[#0F5C35] text-black shadow-md z-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold italic tracking-wider flex items-center gap-2">
              <span className="text-black text-3xl">Y</span>
              <span className="text-[#F37021] text-3xl">R</span>
              <span className="ml-2 text-sm uppercase tracking-widest font-semibold hidden sm:block">Your Ride</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-black hover:text-[#F37021] transition-colors">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 text-sm font-medium bg-[#F37021] text-black hover:bg-orange-600 rounded-md transition-colors shadow-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
