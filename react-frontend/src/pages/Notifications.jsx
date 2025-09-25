import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCircle, User } from 'lucide-react';

const Notifications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  // Simplified mock notifications for card generation
  const cardGeneratedNotifications = [
    {
      id: 1,
      workerId: 'KL-MW-2023-001',
      workerName: 'Ramesh Kumar',
      timestamp: '2024-01-25 at 10:30 AM',
    },
    {
      id: 2,
      workerId: 'KL-MW-2023-002',
      workerName: 'Suresh Singh',
      timestamp: '2024-01-25 at 11:15 AM',
    },
    {
      id: 3,
      workerId: 'KL-MW-2023-003',
      workerName: 'Priya Sharma',
      timestamp: '2024-01-25 at 11:45 AM',
    },
    {
      id: 4,
      workerId: 'KL-MW-2023-004',
      workerName: 'Amit Patel',
      timestamp: '2024-01-25 at 01:20 PM',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Health card generation alerts</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Alerts</h2>
            <div className="space-y-4">
              {cardGeneratedNotifications.length > 0 ? (
                cardGeneratedNotifications.map((notification) => (
                  <div key={notification.id} className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Health Card Generated</p>
                      <p className="text-sm text-gray-600">
                        A new health card has been successfully generated for <span className="font-medium">{notification.workerName}</span> (ID: {notification.workerId}).
                      </p>
                      <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">No new notifications</h3>
                  <p className="text-gray-500">New card generation alerts will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;