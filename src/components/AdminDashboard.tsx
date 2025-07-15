import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  LogOut,
  Calendar,
  BarChart3,
  UserPlus
} from 'lucide-react';
import BulkEmailSender from './BulkEmailSender';

const AdminDashboard = () => {
  const { isAdminLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin');
    }
  }, [isAdminLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  // Dummy data for dashboard
  const stats = {
    totalUsers: 1247,
    paidUsers: 893,
    monthlyRevenue: 12450,
    conversionRate: 71.6,
    recentSignups: [
      { name: 'John Doe', email: 'john@example.com', date: '2025-01-01', plan: 'Premium' },
      { name: 'Jane Smith', email: 'jane@example.com', date: '2025-01-01', plan: 'Basic' },
      { name: 'Mike Johnson', email: 'mike@example.com', date: '2024-12-31', plan: 'Premium' },
      { name: 'Sarah Wilson', email: 'sarah@example.com', date: '2024-12-31', plan: 'Basic' },
      { name: 'David Brown', email: 'david@example.com', date: '2024-12-30', plan: 'Premium' }
    ]
  };

  if (!isAdminLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.paidUsers.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Signups */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Signups</h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Name</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Plan</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentSignups.map((user, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 text-sm text-gray-900">{user.name}</td>
                      <td className="py-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.plan === 'Premium' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="py-2 text-sm text-gray-600">{user.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors flex items-center">
                <BarChart3 className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-blue-600 font-medium">View Analytics</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors flex items-center">
                <Users className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-600 font-medium">Manage Users</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors flex items-center">
                <DollarSign className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-purple-600 font-medium">Payment Logs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Future Enhancements Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Future Enhancements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Payment Logs</h3>
              <p className="text-sm text-gray-600">Detailed transaction history and payment analytics</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">User Management</h3>
              <p className="text-sm text-gray-600">User profiles, activity logs, and account management</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Email Export</h3>
              <p className="text-sm text-gray-600">Export user emails for marketing campaigns</p>
            </div>
          </div>
        </div>
        {/* Bulk Email Sender Section */}
        <BulkEmailSender />
      </div>
    </div>
  );
};

export default AdminDashboard;