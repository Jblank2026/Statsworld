"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNavigationInfo } from '../lib/navigation';

interface ChapterNavigationProps {
  showBottomNavigation?: boolean;
}

export default function ChapterNavigation({ showBottomNavigation = false }: ChapterNavigationProps) {
  const pathname = usePathname();
  const navInfo = getNavigationInfo(pathname);

  if (showBottomNavigation) {
    // Bottom Navigation - Previous/Next Only
    return (
      <>
        {(navInfo.previousTopic || navInfo.nextTopic) && (
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <div className="flex-1">
              {navInfo.previousTopic && (
                <Link
                  href={navInfo.previousTopic}
                  className="text-[#ff8200] hover:text-[#ff9933] flex items-center group"
                >
                  <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </Link>
              )}
            </div>
            
            <div className="flex-1 text-right">
              {navInfo.nextTopic && (
                <Link
                  href={navInfo.nextTopic}
                  className="text-[#ff8200] hover:text-[#ff9933] flex items-center justify-end group"
                >
                  Next
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  // Top Navigation - Back to Chapter Only
  return (
    <div className="mb-8">
      <Link 
        href={navInfo.chapterHome} 
        className="text-[#ff8200] hover:text-[#ff9933] flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to {navInfo.chapterTitle}
      </Link>
    </div>
  );
} 