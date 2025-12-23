"use client";

import { useState } from "react";
import { Home, Calendar, HelpCircle, Info, Menu, X } from "lucide-react";

export default function GlobalNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-4 sm:px-6 lg:px-8 shadow-lg text-white" style={{ backgroundImage: 'url(/global-nav-bg.png)' }}>
      <div className="flex items-center justify-between">
        <a href="/" className="font-bold text-lg text-black hover:text-gray-700 transition-colors">
          My Magical VIP
        </a>
        
        {/* Desktop Navigation */}
        <ul className="hidden min-[600px]:flex gap-6 text-sm font-bold">
          <li>
            <a href="/" className="flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors">
              <Home size={16} />
              Home
            </a>
          </li>
          <li>
            <a href="/typical-days" className="flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors">
              <Calendar size={16} />
              Typical Days
            </a>
          </li>
          <li>
            <a href="/faq" className="flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors">
              <HelpCircle size={16} />
              FAQ
            </a>
          </li>
          <li>
            <a href="/about" className="flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors">
              <Info size={16} />
              About
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="min-[600px]:hidden text-black hover:text-gray-700 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="min-[600px]:hidden mt-4 pt-4 border-t border-gray-300">
          <ul className="flex flex-col gap-4 text-sm font-bold">
            <li>
              <a href="/" className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors">
                <Home size={16} />
                Home
              </a>
            </li>
            <li>
              <a href="/typical-days" className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors">
                <Calendar size={16} />
                Typical Days
              </a>
            </li>
            <li>
              <a href="/faq" className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors">
                <HelpCircle size={16} />
                FAQ
              </a>
            </li>
            <li>
              <a href="/about" className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors">
                <Info size={16} />
                About
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
