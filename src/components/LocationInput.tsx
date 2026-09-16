"use client";
import { useState, useEffect, useRef } from "react";

interface LocationInputProps {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  onSelectLocation: (lat: number, lon: number, displayName: string) => void;
  iconColor: string;
  onUseCurrentLocation?: () => void;
}

export default function LocationInput({ placeholder, value, onChange, onSelectLocation, iconColor, onUseCurrentLocation }: LocationInputProps) {
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      if (value.length < 3) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5`);
        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      // Only search if it's likely a user typing, not just selecting from list
      if (showDropdown || value.length >= 3) {
        fetchLocations();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <input 
          type="text" 
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => {
            if (results.length > 0) setShowDropdown(true);
          }}
          placeholder={placeholder} 
          style={iconColor ? { '--focus-color': iconColor } as React.CSSProperties : {}}
          className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 text-black rounded-lg focus:ring-2 focus:ring-[#0F5C35] focus:bg-white outline-none transition-all pr-12 shadow-sm font-medium`}
        />
        {onUseCurrentLocation && (
          <button 
            type="button"
            onClick={onUseCurrentLocation}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 transition-colors"
            title="Use Current Location"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        )}
      </div>

      {showDropdown && (results.length > 0 || loading) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-sm text-gray-500 text-center">Searching...</div>
          ) : (
            results.map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onChange(r.display_name);
                  onSelectLocation(parseFloat(r.lat), parseFloat(r.lon), r.display_name);
                  setShowDropdown(false);
                }}
                className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-0 truncate"
              >
                {r.display_name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
