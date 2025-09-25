import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  LogOut, User, FileText, Bell, Award, Calendar, QrCode,
  Stethoscope, Users, Shield, AlertTriangle, CheckCircle,
  Clock, Activity, TrendingUp, BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getWorkerDashboard = () => ({
    title: 'Migrant Worker Dashboard',
    subtitle: 'Manage your health records and stay compliant',
    stats: [
      { label: 'Health Status', value: user.healthStatus || 'Pending', color: 'blue', icon: Activity },
      { label: 'Next Checkup', value: user.nextCheckup || 'Not Scheduled', color: 'green', icon: Calendar },
      { label: 'Health ID', value: user.healthId || 'Not Generated', color: 'purple', icon: QrCode },
      { label: 'Compliance', value: user.compliance || '75%', color: 'yellow', icon: CheckCircle }
    ],
    cards: [
      {
        icon: QrCode,
        title: 'My Health Card',
        description: 'View and download your digital health card with QR code',
        path: '/healthcard',
        color: 'blue'
      },
      {
        icon: FileText,
        title: 'Medical Records',
        description: 'Access your complete medical history and test results',
        path: '/health-records',
        color: 'green'
      },
      {
        icon: Calendar,
        title: 'Appointments',
        description: 'View scheduled health checkups and appointments',
        path: '/appointments',
        color: 'purple'
      },
      {
        icon: Bell,
        title: 'Notifications',
        description: 'Check SMS alerts and health reminders',
        path: '/notifications',
        color: 'yellow'
      }
    ],
    alerts: [
      {
        type: 'warning',
        message: 'Complete health checkup due in 3 days',
        action: 'Schedule Now'
      },
      {
        type: 'info',
        message: 'Update vaccination records to maintain compliance',
        action: 'Update Records'
      }
    ]
  });

  const getDoctorDashboard = () => ({
    title: 'Doctor Dashboard',
    subtitle: 'Manage patient care and health assessments',
    stats: [
      { label: 'Active Patients', value: '24', color: 'blue', icon: Users },
      { label: 'Today\'s Appointments', value: '8', color: 'green', icon: Calendar },
      { label: 'Pending Reports', value: '12', color: 'orange', icon: FileText },
      { label: 'Critical Cases', value: '3', color: 'red', icon: AlertTriangle }
    ],
    cards: [
      {
        icon: Users,
        title: 'My Patients',
        description: 'View and manage assigned migrant worker patients',
        path: '/patients',
        color: 'blue'
      },
      {
        icon: Stethoscope,
        title: 'Health Checkups',
        description: 'Conduct and record health examinations',
        path: '/health-checkups',
        color: 'green'
      },
      {
        icon: FileText,
        title: 'Medical Reports',
        description: 'Generate and update patient medical reports',
        path: '/reports',
        color: 'purple'
      },
      {
        icon: Shield,
        title: 'Severity Assessment',
        description: 'Categorize patients by health severity levels',
        path: '/severity-assessment',
        color: 'red'
      }
    ],
    alerts: [
      {
        type: 'urgent',
        message: '3 patients require immediate attention',
        action: 'View Critical Cases'
      },
      {
        type: 'info',
        message: 'Update medical records for 5 patients',
        action: 'Update Records'
      }
    ]
  });

  const getEmployerDashboard = () => ({
    title: 'Employer Dashboard',
    subtitle: 'Monitor worker health and ensure compliance',
    stats: [
      { label: 'Total Workers', value: '45', color: 'blue', icon: Users },
      { label: 'Health Compliant', value: '38', color: 'green', icon: CheckCircle },
      { label: 'Pending Checkups', value: '7', color: 'orange', icon: Clock },
      { label: 'Health Incidents', value: '2', color: 'red', icon: AlertTriangle }
    ],
    cards: [
      {
        icon: Users,
        title: 'My Workers',
        description: 'View all registered workers and their health status',
        path: '/workers',
        color: 'blue'
      },
      {
        icon: Shield,
        title: 'Health Compliance',
        description: 'Monitor worker health compliance and certifications',
        path: '/health-compliance',
        color: 'green'
      },
      {
        icon: FileText,
        title: 'Reports',
        description: 'Generate health compliance and incident reports',
        path: '/reports',
        color: 'purple'
      },
      {
        icon: Bell,
        title: 'Health Alerts',
        description: 'View workplace health alerts and notifications',
        path: '/notifications',
        color: 'yellow'
      }
    ],
    alerts: [
      {
        type: 'warning',
        message: '7 workers due for health checkup this week',
        action: 'Schedule Checkups'
      },
      {
        type: 'info',
        message: 'Monthly compliance report is ready',
        action: 'Download Report'
      }
    ]
  });

  const getAdminDashboard = () => ({
    title: 'Admin Dashboard',
    subtitle: 'System oversight and health monitoring',
    stats: [
      { label: 'Total Workers', value: '2,847', color: 'blue', icon: Users },
      { label: 'Active Doctors', value: '156', color: 'green', icon: Stethoscope },
      { label: 'Employers', value: '89', color: 'purple', icon: Shield },
      { label: 'Critical Cases', value: '23', color: 'red', icon: AlertTriangle }
    ],
    cards: [
      {
        icon: Users,
        title: 'All Workers',
        description: 'Monitor all registered migrant workers',
        path: '/workers',
        color: 'blue'
      },
      {
        icon: Stethoscope,
        title: 'Doctors',
        description: 'Manage doctor registrations and assignments',
        path: '/doctors',
        color: 'green'
      },
      {
        icon: Shield,
        title: 'Health Monitoring',
        description: 'System-wide health monitoring and alerts',
        path: '/health-monitoring',
        color: 'red'
      },
      {
        icon: BarChart3,
        title: 'System Reports',
        description: 'Generate comprehensive system analytics',
        path: '/reports',
        color: 'purple'
      }
    ],
    alerts: [
      {
        type: 'urgent',
        message: '23 critical health cases require immediate doctor assignment',
        action: 'Assign Doctors'
      },
      {
        type: 'warning',
        message: '156 workers overdue for health checkups',
        action: 'Send Notifications'
      }
    ]
  });

  const getDashboardData = () => {
    switch (user.userType) {
      case 'worker':
        return getWorkerDashboard();
      case 'doctor':
        return getDoctorDashboard();
      case 'employer':
        return getEmployerDashboard();
      case 'admin':
        return getAdminDashboard();
      default:
        return getWorkerDashboard();
    }
  };

  const dashboardData = getDashboardData();

  const getAlertColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 border-red-500 text-red-800';
      case 'warning': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'info': return 'bg-blue-100 border-blue-500 text-blue-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const getStatColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'red': return 'bg-red-100 text-red-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getUserTypeColor = (userType) => {
    const colorMap = {
      worker: 'bg-blue-100 text-blue-800',
      doctor: 'bg-green-100 text-green-800',
      employer: 'bg-purple-100 text-purple-800',
      admin: 'bg-red-100 text-red-800',
    };
    return colorMap[userType] || 'bg-gray-100 text-gray-800';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-blue-50 shadow-sm border-b transition-all duration-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">{dashboardData.title}</h1>
              <p className="text-gray-600 mt-1">{dashboardData.subtitle}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500">Welcome,</span>
                <span className="text-lg font-semibold text-blue-800 ml-1">{user.name}</span>
                <span className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getUserTypeColor(user.userType)}`}>
                  {user.userType}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 flex items-center transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardData.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${getStatColor(stat.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alerts */}
        {dashboardData.alerts && dashboardData.alerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Alerts</h2>
            <div className="space-y-3">
              {dashboardData.alerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}> {/* index as key is acceptable here if alerts are not re-ordered */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-3" />
                      <span className="font-medium">{alert.message}</span>
                    </div>
                    <button className="bg-white px-3 py-1 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                      {alert.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardData.cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  to={card.path}
                  className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 transform hover:scale-105 block"
                >
                  <div className={`w-12 h-12 ${getStatColor(card.color)} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Additional Actions */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Update Profile
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors">
              View Health Card
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
