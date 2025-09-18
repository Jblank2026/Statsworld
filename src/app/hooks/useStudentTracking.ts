"use client";

// STUDENT TRACKING COMPLETELY DISABLED
// No database connections, no data collection

export function useStudentTracking() {
  // All tracking functionality disabled
  const trackInteraction = async (
    action: string,
    element?: string,
    value?: string
  ) => {
    // No tracking - function does nothing
    console.log('🚫 Tracking disabled:', { action, element, value });
  };

  // Return disabled state
  return {
    netId: null,
    sessionId: null,
    isLoggedIn: false,
    studentName: null,
    trackInteraction,
  };
}
