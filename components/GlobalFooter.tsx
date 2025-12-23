export default function GlobalFooter() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-emerald-900 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-300">
              My Magical VIP
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/" className="hover:text-amber-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/typical-days" className="hover:text-amber-300 transition-colors">
                  Typical Days
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-amber-300 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-amber-300 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-300">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/terms" className="hover:text-amber-300 transition-colors">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-amber-300 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/cancellation-policy" className="hover:text-amber-300 transition-colors">
                  Cancellation Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-300">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="mailto:info@mymagicalvip.com"
                  className="hover:text-amber-300 transition-colors"
                >
                  info@mymagicalvip.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-300">
              Follow Us
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="https://www.facebook.com/My-Magical-VIP-102990822543949"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-700 pt-8 text-center text-sm text-gray-300">
          <p className="mb-2">Copyright ©2025 My Magical VIP</p>
          <p className="text-xs">
            My Magical VIP is a private company in no way owned by or
            affiliated with the Walt Disney Company, Universal, Comcast or any
            of their parent or subsidiary institutions.
          </p>
        </div>
      </div>
    </footer>
  );
}
