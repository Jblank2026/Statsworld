"use client";

import { useState, useEffect } from 'react';

interface ActivityLog {
  id: string;
  student: {
    netId: string;
    name?: string;
  };
  pagePath: string;
  pageTitle?: string;
  action: string;
  element?: string;
  value?: string;
  visitedAt: string;
}

interface ActivityStats {
  totalToday: number;
  activeStudents: number;
  recentActivity: ActivityLog[];
  activityByType: { action: string; _count: { action: number } }[];
  pageViews: { pagePath: string; _count: { pagePath: number } }[];
}

export default function ActivityMonitorPage() {
  const [activityData, setActivityData] = useState<ActivityStats | null>(null);
  const [realtimeActivity, setRealtimeActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchActivity();
    
    if (autoRefresh) {
      const interval = setInterval(fetchActivity, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const fetchActivity = async () => {
    try {
      // Get recent activity (last 100 actions)
      const response = await fetch('/api/student/activity');
      const data = await response.json();
      
      if (data.recentActivity) {
        setRealtimeActivity(prev => {
          const newActivities = data.recentActivity.filter((activity: ActivityLog) => 
            !prev.some(existing => existing.id === activity.id)
          );
          return [...newActivities, ...prev].slice(0, 50); // Keep last 50 items
        });
      }

      // Get summary stats
      const statsResponse = await fetch('/api/student/stats');
      const statsData = await statsResponse.json();
      setActivityData(statsData.summary);
      
    } catch (error) {
      console.error('Failed to fetch activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    const colors: { [key: string]: string } = {
      'login': 'bg-green-100 text-green-800',
      'page_view': 'bg-blue-100 text-blue-800',
      'explanation_click': 'bg-purple-100 text-purple-800'
    };
    return colors[action] || 'bg-gray-100 text-gray-800';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading activity monitor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#58595b]">Student Page Visits</h1>
            <p className="text-gray-600 mt-2">Track which pages students are visiting in JakesWorld</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-gray-300 text-[#ff8200] focus:ring-[#ff8200]"
              />
              <span className="ml-2 text-sm text-gray-600">Auto-refresh</span>
            </label>
            
            <button
              onClick={fetchActivity}
              className="bg-[#ff8200] text-white px-4 py-2 rounded hover:bg-[#e6750e] transition-colors"
            >
              Refresh Now
            </button>
          </div>
        </div>

        {activityData && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-[#ff8200]">
                  {activityData.todayActivity || 0}
                </div>
                <div className="text-gray-600">Actions Today</div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-[#ff8200]">
                  {activityData.activeStudentsToday || 0}
                </div>
                <div className="text-gray-600">Active Students Today</div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-[#ff8200]">
                  {realtimeActivity.length}
                </div>
                <div className="text-gray-600">Recent Activities</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Page Visit Feed */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-[#58595b] mb-4">
                  Recent Page Visits
                  {autoRefresh && (
                    <span className="ml-2 inline-flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="ml-1 text-sm text-green-600">Live</span>
                    </span>
                  )}
                </h2>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {realtimeActivity.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                      No recent activity
                    </div>
                  ) : (
                    realtimeActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 border-l-4 border-[#ff8200] bg-gray-50 rounded">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-[#58595b]">
                              {activity.student.netId}
                            </span>
                            {activity.student.name && (
                              <span className="text-sm text-gray-500">
                                ({activity.student.name})
                              </span>
                            )}
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(activity.action)}`}>
                              {activity.action.replace('_', ' ')}
                            </span>
                          </div>
                          
                          <div className="text-sm text-gray-600 mt-1">
                            {activity.pagePath}
                            {activity.element && (
                              <span className="text-[#ff8200]"> → {activity.element}</span>
                            )}
                            {activity.value && (
                              <span className="text-gray-500"> ({activity.value})</span>
                            )}
                          </div>
                          
                          <div className="text-xs text-gray-400 mt-1">
                            {formatTimeAgo(activity.visitedAt)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Activity Types */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-[#58595b] mb-4">Activity Types</h3>
                  <div className="space-y-2">
                    {activityData.activityTypes?.map((type) => (
                      <div key={type.action} className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(type.action)}`}>
                          {type.action.replace('_', ' ')}
                        </span>
                        <span className="text-sm text-gray-600">
                          {type._count.action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-[#58595b] mb-4">Popular Pages</h3>
                  <div className="space-y-2">
                    {activityData.pageViews?.slice(0, 5).map((page) => (
                      <div key={page.pagePath} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 truncate">
                          {page.pagePath === '/' ? 'Home' : page.pagePath}
                        </span>
                        <span className="text-[#ff8200] font-medium">
                          {page._count.pagePath}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
