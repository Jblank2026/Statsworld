import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// Ensure Prisma client is ready
async function ensurePrismaReady() {
  try {
    await prisma.$connect()
    return true
  } catch (error) {
    console.error('Prisma connection failed:', error)
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if Prisma is ready
    const isReady = await ensurePrismaReady()
    if (!isReady) {
      return NextResponse.json({ 
        error: 'Database not ready' 
      }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    // Get recent activity with student info
    const recentActivity = await prisma.studentVisit.findMany({
      take: limit,
      skip: offset,
      orderBy: { visitedAt: 'desc' },
      include: {
        student: {
          select: {
            netId: true,
            name: true
          }
        }
      }
    })

    // Get activity counts by type for today
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const todayActivityByType = await prisma.studentVisit.groupBy({
      by: ['action'],
      _count: {
        action: true
      },
      where: {
        visitedAt: {
          gte: todayStart
        }
      },
      orderBy: {
        _count: {
          action: 'desc'
        }
      }
    })

    // Get page views for today
    const todayPageViews = await prisma.studentVisit.groupBy({
      by: ['pagePath'],
      _count: {
        pagePath: true
      },
      where: {
        visitedAt: {
          gte: todayStart
        },
        action: 'page_view'
      },
      orderBy: {
        _count: {
          pagePath: 'desc'
        }
      },
      take: 10
    })

    return NextResponse.json({
      recentActivity,
      todayActivityByType,
      todayPageViews,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Activity API error:', error)
    return NextResponse.json({ 
      error: 'Failed to get activity data' 
    }, { status: 500 })
  }
}
