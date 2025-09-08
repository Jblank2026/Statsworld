"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useStudentTracking() {
  const [netId, setNetId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const pathname = usePathname();

  // Load saved NetID on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNetId = localStorage.getItem('jakesworld_netid');
      const savedSession = localStorage.getItem('jakesworld_session');
      
      if (savedNetId) {
        setNetId(savedNetId);
        setSessionId(savedSession);
      }
    }
  }, []);

  // Automatically track page visits when user navigates
  useEffect(() => {
    if (netId && typeof window !== 'undefined') {
      // Track page view only
      trackPageView();
    }
  }, [pathname, netId]);

  // Track page views only
  const trackPageView = async () => {
    if (!netId || typeof window === 'undefined') return;

    try {
      await fetch('/api/student/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          netId,
          pagePath: pathname,
          pageTitle: document.title,
          action: 'page_view',
          sessionId
        })
      });
      
      console.log(`📄 Page Visit: ${pathname} for ${netId}`);
    } catch (error) {
      console.error('Page view tracking error:', error);
    }
  };

  // Track interactions
  const trackInteraction = async (
    action: string,
    element?: string,
    value?: string
  ) => {
    if (!netId || typeof window === 'undefined') return;

    try {
      await fetch('/api/student/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          netId,
          pagePath: pathname,
          pageTitle: document.title,
          action,
          element,
          value,
          sessionId
        })
      });
      
      console.log(`📊 Tracked: ${action}${element ? ` (${element})` : ''} for ${netId}`);
    } catch (error) {
      console.error('Tracking error:', error);
    }
  };

  // Get current login status
  const isLoggedIn = !!netId;

  // Get student name if available
  const studentName = typeof window !== 'undefined' 
    ? localStorage.getItem('jakesworld_name') 
    : null;

  return {
    netId,
    sessionId,
    isLoggedIn,
    studentName,
    trackInteraction,
  };
}
