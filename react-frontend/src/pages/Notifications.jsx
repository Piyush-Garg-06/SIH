import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Bell, AlertTriangle, CheckCircle, Clock, Calendar,
  MessageSquare, Phone, Mail, X, Filter, Search
} from 'lucide-react';
import { useState } from 'react';

const Notifications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock notifications data - in real app this would come from API
  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Health Checkup',
      message: 'Your mandatory health checkup is scheduled for tomorrow at 10:00 AM at Government Hospital, Thiruvananthapuram.',
      date: '2024-01-24',
      time: '08:00 AM',
      priority: 'high',
      read: false,
      actionUrl: '/appointments',
      actionText: 'View Appointment'
    },
    {
      id: 2,
      type: 'health_alert',
      title: 'Health Report Available',
      message: 'Your latest blood test results are now available. All parameters are within normal range.',
      date: '2024-01-23',
      time: '02:30 PM',
      priority: 'normal',
      read: true,
      actionUrl: '/health-records',
      actionText: 'View Report'
    },
    {
      id: 3,
      type: 'vaccination',
      title: 'Vaccination Reminder',
      message: 'Your COVID-19 booster vaccination is due in 2 weeks. Please schedule your appointment.',
      date: '2024-01-22',
      time: '10:15 AM',
      priority: 'medium',
      read: false,
      actionUrl: '/appointments',
      actionText: 'Schedule Now'
    },
    {
      id: 4,
      type: 'compliance',
      title: 'Health Compliance Update',
      message: 'Your health records have been verified. You are now compliant with Kerala migrant worker health regulations.',
      date: '2024-01-21',
      time: '04:45 PM',
      priority: 'normal',
      read: true,
      actionUrl: '/healthcard',
      actionText: 'View Health Card'
    },
    {
      id: 5,
      type: 'emergency',
      title: 'Emergency Contact Update',
      message: 'Please update your emergency contact information to ensure we can reach you in case of medical emergencies.',
      date: '2024-01-20',
      time: '09:30 AM',
      priority: 'high',
      read: false,
      actionUrl: '/dashboard',
      actionText: 'Update Now'
    },
    {
      id: 6,
      type: 'scheme',
      title: 'Government Health Scheme',
      message: 'You are eligible for the Kerala Migrant Health Insurance Scheme. Apply now to get coverage for medical expenses.',
      date: '2024-01-19',
      time: '11:20 AM',
      priority: 'normal',
      read: true,
      actionUrl: '/schemes',
      actionText: 'Apply Now'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'appointment': return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'health_alert': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'vaccination': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'compliance': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'emergency': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'scheme': return <Bell className="w-5 h-5 text-purple-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'normal': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' ||
      (filter === 'unread' && !notification.read) ||
      (filter === 'read' && notification.read) ||
      (filter === notification.type);

    const matchesSearch = searchTerm === '' ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Notifications</h1>
              <p className="text-gray-600 mt-1">Stay updated with your health alerts and important messages</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">
                  {unreadCount} unread
                </span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Mark All Read
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
                <option value="appointment">Appointments</option>
                <option value="health_alert">Health Alerts</option>
                <option value="vaccination">Vaccinations</option>
                <option value="compliance">Compliance</option>
                <option value="emergency">Emergency</option>
                <option value="scheme">Schemes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-l-4 rounded-r-lg shadow-sm ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'bg-white border-r border-t border-b' : 'bg-gray-50'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`text-lg font-semibold ${
                            notification.read ? 'text-gray-700' : 'text-gray-900'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                        </div>
                        <p className={`text-sm mb-3 ${
                          notification.read ? 'text-gray-600' : 'text-gray-800'
                        }`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{notification.date} at {notification.time}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                            notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {notification.priority} priority
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(notification.actionUrl)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        {notification.actionText}
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications Found</h3>
              <p className="text-gray-600">
                {searchTerm || filter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'You have no notifications at the moment.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Notification Preferences */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Email Notifications</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-gray-700">Appointment reminders</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-gray-700">Health report updates</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-gray-700">Emergency alerts</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">SMS Notifications</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-gray-700">Checkup schedules</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-gray-700">Vaccination reminders</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-gray-700">Compliance updates</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
