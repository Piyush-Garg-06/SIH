import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Calendar, Download, Eye, AlertCircle,
  CheckCircle, Clock, Stethoscope, Pill, Activity
} from 'lucide-react';

const HealthRecords = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock data - in real app this would come from API
  const medicalRecords = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'Health Checkup',
      doctor: 'Dr. Priya Nair',
      hospital: 'Government Hospital, Thiruvananthapuram',
      diagnosis: 'General Health Assessment',
      status: 'completed',
      severity: 'normal',
      prescriptions: ['Vitamin D supplements', 'Iron tablets'],
      tests: ['Blood Test', 'X-Ray Chest'],
      notes: 'Patient is in good health. Recommended regular exercise.'
    },
    {
      id: 2,
      date: '2023-12-10',
      type: 'Vaccination',
      doctor: 'Dr. Rajesh Kumar',
      hospital: 'Primary Health Center, Kollam',
      diagnosis: 'COVID-19 Vaccination',
      status: 'completed',
      severity: 'normal',
      prescriptions: [],
      tests: [],
      notes: 'COVID-19 booster dose administered successfully.'
    },
    {
      id: 3,
      date: '2023-11-05',
      type: 'Emergency',
      doctor: 'Dr. Meera Iyer',
      hospital: 'District Hospital, Ernakulam',
      diagnosis: 'Acute Fever',
      status: 'completed',
      severity: 'moderate',
      prescriptions: ['Paracetamol 500mg', 'Antibiotics'],
      tests: ['Blood Culture', 'Malaria Test'],
      notes: 'Treated for viral fever. Rest advised for 5 days.'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      date: '2024-01-25',
      time: '10:00 AM',
      type: 'Follow-up Checkup',
      doctor: 'Dr. Priya Nair',
      hospital: 'Government Hospital, Thiruvananthapuram',
      status: 'scheduled'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'scheduled': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Medical Records</h1>
              <p className="text-gray-600 mt-1">Access your complete health history and medical records</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Health ID:</span>
              <span className="font-mono bg-blue-100 px-3 py-1 rounded text-blue-800">
                {user.healthId || 'Not Generated'}
              </span>
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
                <p className="text-sm text-gray-600">Total Records</p>
                <p className="text-2xl font-bold text-gray-900">{medicalRecords.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Checkups</p>
                <p className="text-2xl font-bold text-gray-900">
                  {medicalRecords.filter(r => r.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Health Status</p>
                <p className="text-2xl font-bold text-gray-900">Good</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
            <div className="bg-white rounded-lg shadow-sm border">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-6 border-b last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Calendar className="w-6 h-6 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{appointment.type}</h3>
                        <p className="text-sm text-gray-600">
                          {appointment.date} at {appointment.time}
                        </p>
                        <p className="text-sm text-gray-600">
                          {appointment.doctor} - {appointment.hospital}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {appointment.status}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medical Records */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Medical History</h2>
          <div className="space-y-6">
            {medicalRecords.map((record) => (
              <div key={record.id} className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(record.status)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{record.type}</h3>
                        <p className="text-sm text-gray-600">
                          {record.date} • {record.doctor}
                        </p>
                        <p className="text-sm text-gray-600">{record.hospital}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(record.severity)}`}>
                        {record.severity}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Diagnosis</h4>
                      <p className="text-gray-700">{record.diagnosis}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Doctor's Notes</h4>
                      <p className="text-gray-700">{record.notes}</p>
                    </div>
                  </div>

                  {record.prescriptions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Pill className="w-4 h-4 mr-2" />
                        Prescriptions
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {record.prescriptions.map((prescription, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {prescription}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {record.tests.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Stethoscope className="w-4 h-4 mr-2" />
                        Tests Conducted
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {record.tests.map((test, index) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {test}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download All Records */}
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Complete Health Records</h3>
          <p className="text-gray-600 mb-4">
            Get a comprehensive PDF report of all your medical records and history
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5 inline mr-2" />
            Download All Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
