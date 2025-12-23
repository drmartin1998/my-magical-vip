import { Home, Calendar, HelpCircle, Info } from "lucide-react";

export default function GlobalNav() {
  return (
    <nav className="w-full py-4 px-4 sm:px-6 lg:px-8 shadow-lg text-white" style={{ backgroundImage: 'url(/global-nav-bg.png)' }}>
      <div className="flex items-center justify-between">
        <a href="/" className="font-bold text-lg text-black hover:text-gray-700 transition-colors">
          My Magical VIP
        </a>
        <ul className="flex gap-6 text-sm font-bold">
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
      </div>
    </nav>
  );
}
