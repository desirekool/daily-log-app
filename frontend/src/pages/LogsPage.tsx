import React, { useState } from 'react';
import { useAuth } from '../components/auth/AuthContext';
import { Link, useParams } from 'react-router-dom';

const LogsPage: React.FC = () => {
  const { logout } = useAuth();
  const { planId } = useParams<{ planId: string }>();
  const [logs, setLogs] = useState([
    {
      id: 1,
      dayNumber: 1,
      date: '2023-06-15',
      timeSpent: '4 hours',
      learned: 'Learned about React hooks and context API',
      built: 'Created authentication system and basic routing',
      blockers: 'None',
      commit: 'feat: implement auth system'
    },
    {
      id: 2,
      dayNumber: 2,
      date: '2023-06-16',
      timeSpent: '6 hours',
      learned: 'Deep dive into Spring Boot security and JPA',
      built: 'Backend user management and plan entities',
      blockers: 'Docker networking issues',
      commit: 'feat: backend user and plan models'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Daily Log App</h1>
              </div>
              <div className="ml-6 flex items-center">
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/plans" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Plans
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Daily Logs - Plan {planId}</h2>
              <p className="text-gray-600">Track your daily progress</p>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add New Log
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {logs.map((log) => (
                <li key={log.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-indigo-600 truncate">Day {log.dayNumber}</h3>
                      <p className="text-sm text-gray-500 mb-2">{log.date}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-2">
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Edit
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Time Spent</p>
                      <p className="text-sm text-gray-900 mt-1">{log.timeSpent}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Learned</p>
                      <p className="text-sm text-gray-900 mt-1">{log.learned}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Built</p>
                      <p className="text-sm text-gray-900 mt-1">{log.built}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Blockers</p>
                      <p className="text-sm text-gray-900 mt-1">{log.blockers}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-500">Commit</p>
                      <p className="text-sm text-gray-900 mt-1">{log.commit}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LogsPage;