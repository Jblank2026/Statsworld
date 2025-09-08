'use client';

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b-4 border-[#ff8200]">
      <style jsx>{`
        .nav-link.ai-link {
          color: #FF8200;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .nav-link.ai-link:hover {
          color: #58595b;
        }

        .nav-link.ai-link svg {
          width: 16px;
          height: 16px;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold text-[#58595b] hover:text-[#ff8200] transition-colors">
            JakesWorld
          </Link>
          <div className="hidden sm:flex space-x-8">
            <Link href="/" className="text-[#58595b] hover:text-[#ff8200] transition-colors">Home</Link>
            <Link href="/chapters" className="text-[#58595b] hover:text-[#ff8200] transition-colors">Chapters</Link>
            <Link href="/resources" className="text-[#58595b] hover:text-[#ff8200] transition-colors">Resources</Link>
            <Link href="/about" className="text-[#58595b] hover:text-[#ff8200] transition-colors">About</Link>
            <a href="https://jakes-bot.vercel.app/" className="nav-link ai-link">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              AI Chat
            </a>
          </div>
          {/* Mobile Menu Button */}
          <button className="sm:hidden p-2 rounded-md text-[#58595b] hover:text-[#ff8200] transition-colors">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu (hidden by default) */}
      <div className="hidden sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 text-[#58595b] hover:text-[#ff8200] transition-colors">Home</Link>
          <Link href="/chapters" className="block px-3 py-2 text-[#58595b] hover:text-[#ff8200] transition-colors">Chapters</Link>
          <Link href="/resources" className="block px-3 py-2 text-[#58595b] hover:text-[#ff8200] transition-colors">Resources</Link>
          <Link href="/about" className="block px-3 py-2 text-[#58595b] hover:text-[#ff8200] transition-colors">About</Link>
          <a href="https://jakes-bot.vercel.app/" className="block px-3 py-2 nav-link ai-link">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            AI Chat
          </a>
        </div>
      </div>
    </nav>
  );
} 