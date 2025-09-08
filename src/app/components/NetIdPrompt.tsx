"use client";

import { useState, useEffect } from 'react';

export default function NetIdPrompt() {
  const [netId, setNetId] = useState('');
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const savedNetId = localStorage.getItem('jakesworld_netid');
    if (savedNetId) {
      setIsLoggedIn(true);
      setNetId(savedNetId);
    } else {
      // Show prompt immediately
      setShowPrompt(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!netId.trim() || !name.trim()) return;

    setIsLoading(true);
    
    try {
      // Generate session ID
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Track the login
      const response = await fetch('/api/student/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          netId: netId.trim().toLowerCase(),
          name: name.trim() || undefined,
          pagePath: window.location.pathname,
          pageTitle: document.title,
          action: 'login',
          sessionId: sessionId
        })
      });

      if (response.ok) {
        // Save to localStorage
        localStorage.setItem('jakesworld_netid', netId.trim().toLowerCase());
        localStorage.setItem('jakesworld_session', sessionId);
        if (name.trim()) {
          localStorage.setItem('jakesworld_name', name.trim());
        }

        setIsLoggedIn(true);
        setShowPrompt(false);
        
        console.log(`✅ Logged in: ${netId.trim().toLowerCase()}`);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('❌ Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Track page views for logged in users
  useEffect(() => {
    if (isLoggedIn && typeof window !== 'undefined') {
      const savedNetId = localStorage.getItem('jakesworld_netid');
      const savedSession = localStorage.getItem('jakesworld_session');
      
      if (savedNetId) {
        fetch('/api/student/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            netId: savedNetId,
            pagePath: window.location.pathname,
            pageTitle: document.title,
            action: 'page_view',
            sessionId: savedSession
          })
        }).catch(error => console.error('Page view tracking failed:', error));
      }
    }
  }, [isLoggedIn]);

  // Don't render if logged in or not showing prompt
  if (!showPrompt || isLoggedIn) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#58595b]">Welcome to JakesWorld!</h2>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">
          Please enter your UTK NetID to track your learning progress and help improve the platform.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              value={netId}
              onChange={(e) => setNetId(e.target.value)}
              placeholder="UTK NetID (e.g., jsmith42)"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ff8200] focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ff8200] focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={!netId.trim() || !name.trim() || isLoading}
            className="w-full bg-[#ff8200] text-white py-2 px-4 rounded hover:bg-[#e6750e] focus:outline-none focus:ring-2 focus:ring-[#ff8200] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Logging in...' : 'Enter JakesWorld'}
          </button>
        </form>
        
        <p className="text-xs text-gray-500 mt-3 text-center">
          Your NetID helps us track learning progress and improve the platform. Data is used for educational purposes only.
        </p>
      </div>
    </div>
  );
}
