"use client";

import { useStudentTracking } from '../hooks/useStudentTracking';

// This component automatically tracks page visits when mounted
// No visual output - just tracks when students visit pages
export default function SimplePageTracker() {
  // The useStudentTracking hook automatically handles page visit tracking
  // when the pathname changes, so this component just needs to exist
  
  useStudentTracking(); // This triggers the page tracking
  
  // Component renders nothing visible
  return null;
}
