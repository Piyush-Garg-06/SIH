import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, User, Phone, AlertCircle,
  CheckCircle, XCircle, Video, MessageSquare, Bell
} from 'lucide-react';

const Appointments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock data - in real app this would come from API
  const appointments = [
    {
      id: 1,
      date: '2024-01-25',
      time: '10:00 AM',
      type: 'Health Checkup',
      doctor: 'Dr. Priya Nair',
      hospital: 'Government Hospital, Thiruvananthapuram',
      department: 'General Medicine',
      status: 'scheduled',
      priority: 'normal',
      notes: 'Annual health checkup as per mandatory schedule',
      contact: '+91-9876543210',
      address: 'Medical College Road, Thiruvananthapuram'
    },
    {
      id: 2,
      date: '2024-01-20',
      time: '2:30 PM',
      type: 'Follow-up',
      doctor: 'Dr. Rajesh Kumar',
      hospital: 'Primary Health Center, Kollam',
      department: 'Cardiology',
      status: 'completed',
      priority: 'high',
      notes: 'Follow-up for blood pressure monitoring',
      contact: '+91-9876543211',
      address: 'NH 66, Kollam'
    },
    {
      id: 3,
      date: '2024-02-05',
      time: '11:15 AM',
      type: 'Vaccination',
      doctor: 'Dr. Meera Iyer',
      hospital: 'District Hospital, Ernakulam',
      department: 'Immunization',
      status: 'scheduled',
      priority: 'normal',
      notes: 'COVID-19 booster vaccination',
      contact: '+91-9876543212',
      address: 'Hospital Road, Ernakulam'
    },
    {
      id: 4,
      date: '2024-01-18',
      time: '9:00 AM',
      type: 'Emergency Consultation',
      doctor: 'Dr. Anil Menon',
      hospital: 'Medical College Hospital, Kozhikode',
      department: 'Emergency',
      status: 'cancelled',
      priority: 'urgent',
      notes: 'Cancelled due to patient unavailability',
      contact: '+91-9876543213',
      address: 'Medical College Campus, Kozhikode'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'rescheduled': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default: return <Calendar className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'scheduled');
  const pastAppointments = appointments.filter(apt => apt.status !== 'scheduled');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">My Appointments</h1>
              <p className="text-gray-600 mt-1">Manage your health checkup schedules and appointments</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                <Calendar className="w-5 h-5 inline mr-2" />
                Schedule New Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(apt => apt.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(apt => apt.date.startsWith('2024-01')).length}
                </p>
              </div>
              <Bell className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(appointment.status)}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{appointment.type}</h3>
                          <p className="text-sm text-gray-600">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(appointment.priority)}`}>
                          {appointment.priority}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{appointment.doctor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{appointment.hospital}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{appointment.contact}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{appointment.notes}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <strong>Department:</strong> {appointment.department}
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                          <Video className="w-4 h-4 inline mr-1" />
                          Join Call
                        </button>
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors">
                          <MessageSquare className="w-4 h-4 inline mr-1" />
                          Contact
                        </button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Appointments</h3>
              <p className="text-gray-600 mb-4">You don't have any scheduled appointments at the moment.</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Schedule New Appointment
              </button>
            </div>
          )}
        </div>

        {/* Past Appointments */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment History</h2>
          <div className="space-y-4">
            {pastAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(appointment.status)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.type}</h3>
                        <p className="text-sm text-gray-600">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(appointment.priority)}`}>
                        {appointment.priority}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{appointment.doctor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{appointment.hospital}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700"><strong>Department:</strong> {appointment.department}</p>
                      <p className="text-sm text-gray-700"><strong>Notes:</strong> {appointment.notes}</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white px-4 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
              <Calendar className="w-5 h-5 inline mr-2" />
              Schedule Appointment
            </button>
            <button className="bg-green-600 text-white px-4 py-3 rounded-md font-medium hover:bg-green-700 transition-colors">
              <Bell className="w-5 h-5 inline mr-2" />
              Set Reminders
            </button>
            <button className="bg-purple-600 text-white px-4 py-3 rounded-md font-medium hover:bg-purple-700 transition-colors">
              <MessageSquare className="w-5 h-5 inline mr-2" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
