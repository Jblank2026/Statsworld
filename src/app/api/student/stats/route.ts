import { NextRequest, NextResponse } from 'next/server'

// DATABASE STATS COMPLETELY DISABLED
export async function GET(request: NextRequest) {
  // No database operations - stats disabled
  console.log('🚫 Database stats disabled - no data available')
  
  return NextResponse.json({ 
    students: [], 
    totalStudents: 0,
    message: 'Database stats disabled - no data collection' 
  })
}
