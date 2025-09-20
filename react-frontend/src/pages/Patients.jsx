import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Users, Search, Filter, User, MapPin, Calendar,
  AlertTriangle, CheckCircle, Clock, Phone, Mail,
  Stethoscope, FileText, Eye, Edit, Plus
} from 'lucide-react';
import { useState } from 'react';

const Patients = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  if (!user || user.userType !== 'doctor') {
    navigate('/login');
    return null;
  }

  // Mock patients data - in real app this would come from API
  const patients = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      age: 32,
      gender: 'Male',
      healthId: 'KL2024001',
      phone: '+91-9876543210',
      location: 'Construction Site, Thiruvananthapuram',
      employer: 'ABC Constructions Ltd',
      lastCheckup: '2024-01-20',
      nextCheckup: '2024-01-25',
      severity: 'moderate',
      status: 'active',
      conditions: ['Hypertension', 'Vitamin D Deficiency'],
      compliance: 85,
      emergencyContact: '+91-9876543211'
    },
    {
      id: 2,
      name: 'Suresh Patel',
      age: 28,
      gender: 'Male',
      healthId: 'KL2024002',
      phone: '+91-9876543212',
      location: 'Factory, Kochi',
      employer: 'Industrial Corp Ltd',
      lastCheckup: '2024-01-18',
      nextCheckup: '2024-02-01',
      severity: 'normal',
      status: 'active',
      conditions: ['Normal Health'],
      compliance: 95,
      emergencyContact: '+91-9876543213'
    },
    {
      id: 3,
      name: 'Amit Singh',
      age: 35,
      gender: 'Male',
      healthId: 'KL2024003',
      phone: '+91-9876543214',
      location: 'Plantation, Wayanad',
      employer: 'Green Farms Ltd',
      lastCheckup: '2024-01-15',
      nextCheckup: '2024-01-30',
      severity: 'high',
      status: 'critical',
      conditions: ['Diabetes', 'Hypertension', 'Respiratory Issues'],
      compliance: 60,
      emergencyContact: '+91-9876543215'
    },
    {
      id: 4,
      name: 'Rajesh Verma',
      age: 30,
      gender: 'Male',
      healthId: 'KL2024004',
      phone: '+91-9876543216',
      location: 'Construction Site, Kozhikode',
      employer: 'BuildTech Ltd',
      lastCheckup: '2024-01-10',
      nextCheckup: '2024-01-24',
      severity: 'low',
      status: 'active',
      conditions: ['Mild Anemia'],
      compliance: 90,
      emergencyContact: '+91-9876543217'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = searchTerm === '' ||
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.healthId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.employer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === 'all' || patient.status === filter;
    const matchesSeverity = severityFilter === 'all' || patient.severity === severityFilter;

    return matchesSearch && matchesFilter && matchesSeverity;
  });

  const stats = {
    total: patients.length,
    active: patients.filter(p => p.status === 'active').length,
    critical: patients.filter(p => p.severity === 'critical' || p.status === 'critical').length,
    normal: patients.filter(p => p.severity === 'normal').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">My Patients</h1>
              <p className="text-gray-600 mt-1">Manage and monitor migrant worker patients</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                <Plus className="w-5 h-5 inline mr-2" />
                Add New Patient
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Patients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Cases</p>
                <p className="text-2xl font-bold text-gray-900">{stats.critical}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Normal Health</p>
                <p className="text-2xl font-bold text-gray-900">{stats.normal}</p>
              </div>
              <Stethoscope className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="critical">Critical</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Severity:</span>
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="moderate">Moderate</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Patients List */}
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-600">
                        {patient.age} years • {patient.gender} • Health ID: {patient.healthId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(patient.severity)}`}>
                      {patient.severity}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{patient.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Last: {patient.lastCheckup}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Next: {patient.nextCheckup}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2"><strong>Employer:</strong> {patient.employer}</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Conditions:</strong> {patient.conditions.join(', ')}</p>
                  <p className="text-sm text-gray-600"><strong>Compliance:</strong> {patient.compliance}%</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${patient.compliance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{patient.compliance}%</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/health-checkups/${patient.id}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Stethoscope className="w-4 h-4 inline mr-1" />
                      Checkup
                    </button>
                    <button
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      <Eye className="w-4 h-4 inline mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/reports/${patient.id}`)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                    >
                      <FileText className="w-4 h-4 inline mr-1" />
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Patients Found</h3>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all' || severityFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'You have no assigned patients at the moment.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
