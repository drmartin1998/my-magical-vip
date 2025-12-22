import Image from 'next/image';

export default async function AdminPage() {
  // Auth is handled by middleware.ts

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="w-full py-4 px-4 sm:px-6 lg:px-8 shadow-lg text-white" style={{ backgroundImage: 'url(/global-nav-bg.png)' }}>
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-lg text-black hover:text-gray-700 transition-colors">
            <Image src="/key-logo.png" alt="Key Logo" width={48} height={48} className="h-12 w-auto" />
            My Magical VIP - Admin
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/api/auth/logout"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Logout
            </a>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Waiting List Card */}
            <a
              href="/admin/waiting-list"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Waiting List</h2>
              </div>
              <p className="text-gray-600">View and manage waiting list entries</p>
            </a>

            {/* Blackout Dates Card */}
            <a
              href="/admin/blackout-dates"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Blackout Dates</h2>
              </div>
              <p className="text-gray-600">Manage unavailable dates</p>
            </a>

            {/* Appointments Card */}
            <a
              href="/admin/appointments"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
              </div>
              <p className="text-gray-600">View all scheduled appointments</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
