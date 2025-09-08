import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// Get student stats for analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const netId = searchParams.get('netId')
    
    if (netId) {
      // Get specific student stats
      const student = await prisma.student.findUnique({
        where: { netId: netId.toLowerCase() },
        include: {
          visits: {
            orderBy: { visitedAt: 'desc' },
            take: 50
          },
          _count: {
            select: { visits: true }
          }
        }
      })
      
      return NextResponse.json({ student })
    } else {
      // Get all students summary
      const totalStudents = await prisma.student.count()
      const totalVisits = await prisma.studentVisit.count()
      
      const recentStudents = await prisma.student.findMany({
        take: 10,
        orderBy: { updatedAt: 'desc' },
        include: {
          _count: {
            select: { visits: true }
          }
        }
      })
      
      const popularPages = await prisma.studentVisit.groupBy({
        by: ['pagePath'],
        _count: {
          pagePath: true
        },
        orderBy: {
          _count: {
            pagePath: 'desc'
          }
        },
        take: 10
      })

      const activityTypes = await prisma.studentVisit.groupBy({
        by: ['action'],
        _count: {
          action: true
        },
        orderBy: {
          _count: {
            action: 'desc'
          }
        }
      })

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      
      const todayActivity = await prisma.studentVisit.count({
        where: {
          visitedAt: {
            gte: todayStart
          }
        }
      })

      const activeStudentsToday = await prisma.studentVisit.findMany({
        where: {
          visitedAt: {
            gte: todayStart
          }
        },
        select: {
          student: {
            select: {
              netId: true,
              name: true
            }
          }
        },
        distinct: ['studentId']
      })
      
      return NextResponse.json({
        summary: {
          totalStudents,
          totalVisits,
          todayActivity,
          activeStudentsToday: activeStudentsToday.length,
          recentStudents,
          popularPages,
          activityTypes
        }
      })
    }
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ 
      error: 'Failed to get stats' 
    }, { status: 500 })
  }
}
