import type { Metadata } from "next";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";

export const metadata: Metadata = {
  title: "Cancellation Policy - My Magical VIP",
  description: "Cancellation and refund policy for My Magical VIP services",
};

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <GlobalNav />



      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0643/1971/7626/files/2thomas-kelley-5YtjgRNTli4-unsplash.jpg?crop=center&width=3000)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 via-gray-800/40 to-gray-900/40"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '2px 2px 2px #333333' }}>
            Cancellation Policy
          </h1>
        </div>
      </section>
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-blue-600 hover:text-blue-700">
                Home
              </a>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700 font-medium">Cancellation Policy</li>
          </ol>
        </div>
      </nav>
      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Main Content */}
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg p-8 border-l-4 border-emerald-500">
              <h2 className="text-3xl font-bold text-blue-900 mb-6">
                Cancellation Fee &amp; Itinerary Date Change Fee
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  All prepaid tours can be cancelled up to 30 days in advance with a full refund.
                </p>
                <p>
                  Cancellations made 30 to 15 days prior to your VIP tour will automatically be charged a 50% cancellation fee, the remaining 50% will be refunded within one week of cancellation notification. Cancellation fees apply to each VIP tour day canceled.
                </p>
                <p>
                  All MyMagical VIP cancellations made less than 14 days prior to your VIP tour will receive no refund.
                </p>
              </div>
            </div>

            {/* Summary Table */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Cancellation Timeline</h3>
              <div className="overflow-hidden rounded-lg border border-gray-300">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gradient-to-r from-blue-600 to-emerald-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Cancellation Window
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Refund Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        30+ days before tour
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                        100% Full Refund
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        15-29 days before tour
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-amber-600">
                        50% Refund (50% cancellation fee)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        Less than 14 days before tour
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-red-600">
                        No Refund
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Need to Cancel or Have Questions?</h3>
              <p className="mb-6">
                Please contact us as soon as possible to process your cancellation.
              </p>
              <a
                href="mailto:info@mymagicalvip.com"
                className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
