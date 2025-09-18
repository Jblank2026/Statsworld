import { NextRequest, NextResponse } from 'next/server'

// DATABASE TRACKING COMPLETELY DISABLED
export async function POST(request: NextRequest) {
  // No database operations - tracking disabled
  console.log('🚫 Database tracking disabled - no data stored')
  
  return NextResponse.json({ 
    success: true, 
    message: 'Tracking disabled - no database connection' 
  })
}
