"use client";

import { useState, useEffect } from 'react';

interface Student {
  id: string;
  netId: string;
  name?: string;
  createdAt: string;
  _count: {
    visits: number;
  };
}

interface Visit {
  id: string;
  pagePath: string;
  pageTitle?: string;
  action: string;
  element?: string;
  visitedAt: string;
}

interface AnalyticsData {
  summary: {
    totalStudents: number;
    totalVisits: number;
    recentStudents: Student[];
    popularPages: { pagePath: string; _count: { pagePath: number } }[];
  };
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/student/stats');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentDetails = async (netId: string) => {
    try {
      const response = await fetch(`/api/student/stats?netId=${netId}`);
      const result = await response.json();
      setStudentData(result.student);
    } catch (error) {
      console.error('Failed to fetch student details:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#58595b]">JakesWorld Analytics</h1>
          <p className="text-gray-600 mt-2">Student NetID tracking and engagement data</p>
        </div>

        {data && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-[#ff8200]">
                  {data.summary.totalStudents}
                </div>
                <div className="text-gray-600">Total Students</div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-[#ff8200]">
                  {data.summary.totalVisits}
                </div>
                <div className="text-gray-600">Total Interactions</div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-[#ff8200]">
                  {data.summary.popularPages.length}
                </div>
                <div className="text-gray-600">Active Pages</div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-[#ff8200]">
                  {data.summary.totalVisits > 0 ? 
                    Math.round(data.summary.totalVisits / data.summary.totalStudents) : 0}
                </div>
                <div className="text-gray-600">Avg Interactions/Student</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Students */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-[#58595b] mb-4">Recent Students</h2>
                <div className="space-y-3">
                  {data.summary.recentStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex justify-between items-center p-3 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => {
                        setSelectedStudent(student.netId);
                        fetchStudentDetails(student.netId);
                      }}
                    >
                      <div>
                        <div className="font-medium text-[#58595b]">{student.netId}</div>
                        {student.name && (
                          <div className="text-sm text-gray-500">{student.name}</div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student._count.visits} interactions
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Pages */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-[#58595b] mb-4">Popular Pages</h2>
                <div className="space-y-3">
                  {data.summary.popularPages.map((page, index) => (
                    <div key={page.pagePath} className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="font-medium text-[#58595b]">
                          {page.pagePath === '/' ? 'Home' : page.pagePath}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {page._count.pagePath} visits
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Details Modal */}
            {selectedStudent && studentData && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-[#58595b]">
                      Student Details: {selectedStudent}
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedStudent(null);
                        setStudentData(null);
                      }}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  {studentData.name && (
                    <p className="text-gray-600 mb-4">Name: {studentData.name}</p>
                  )}
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-[#58595b] mb-2">Recent Activity</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {studentData.visits.map((visit: Visit) => (
                        <div key={visit.id} className="text-sm bg-gray-50 p-2 rounded">
                          <div className="font-medium">{visit.action}</div>
                          <div className="text-gray-600">
                            {visit.pagePath}
                            {visit.element && ` → ${visit.element}`}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {new Date(visit.visitedAt).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
