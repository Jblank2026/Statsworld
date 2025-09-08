import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-[#58595b]">
                JakesWorld
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  href="/admin/analytics" 
                  className="text-gray-600 hover:text-[#ff8200] transition-colors"
                >
                  Analytics Dashboard
                </Link>
                <Link 
                  href="/admin/activity" 
                  className="text-gray-600 hover:text-[#ff8200] transition-colors"
                >
                  Page Visits
                </Link>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Admin Panel
            </div>
          </div>
        </div>
      </nav>
      
      {children}
    </div>
  );
}
