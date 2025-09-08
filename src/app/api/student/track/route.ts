import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { 
      netId, 
      name, 
      pagePath, 
      pageTitle, 
      action, 
      element, 
      value,
      sessionId 
    } = await request.json()
    
    if (!netId) {
      return NextResponse.json({ error: 'NetID is required' }, { status: 400 })
    }
    
    // Get user agent for tracking
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // Create or get existing student
    const student = await prisma.student.upsert({
      where: { netId: netId.toLowerCase() },
      update: { 
        name: name || undefined,
        updatedAt: new Date()
      },
      create: { 
        netId: netId.toLowerCase(), 
        name: name || undefined 
      }
    })
    
    // Track the visit/interaction
    await prisma.studentVisit.create({
      data: {
        studentId: student.id,
        pagePath: pagePath || '/',
        pageTitle: pageTitle || undefined,
        action: action || 'visit',
        element: element || undefined,
        value: value || undefined,
        sessionId: sessionId || undefined,
        userAgent: userAgent
      }
    })
    
    console.log(`✅ Tracked ${action} for NetID: ${netId} on ${pagePath}`)
    
    return NextResponse.json({ 
      success: true, 
      message: `Tracked ${action} for ${netId}` 
    })
  } catch (error) {
    console.error('❌ Tracking error:', error)
    return NextResponse.json({ 
      error: 'Failed to track interaction' 
    }, { status: 500 })
  }
}
