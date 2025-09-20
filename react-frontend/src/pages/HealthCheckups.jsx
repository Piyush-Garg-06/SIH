import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope, User, Calendar, Clock, FileText,
  CheckCircle, AlertTriangle, Save, Plus, Search,
  Thermometer, Heart, Activity, Weight, Ruler
} from 'lucide-react';
import { useState } from 'react';

const HealthCheckups = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isExamining, setIsExamining] = useState(false);

  if (!user || user.userType !== 'doctor') {
    navigate('/login');
    return null;
  }

  // Mock data
  const patients = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      age: 32,
      healthId: 'KL2024001',
      lastCheckup: '2024-01-20',
      status: 'scheduled'
    },
    {
      id: 2,
      name: 'Suresh Patel',
      age: 28,
      healthId: 'KL2024002',
      lastCheckup: '2024-01-18',
      status: 'completed'
    }
  ];

  const [vitalSigns, setVitalSigns] = useState({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    weight: '',
    height: '',
    bmi: '',
    oxygenSaturation: ''
  });

  const [examination, setExamination] = useState({
    generalCondition: '',
    symptoms: '',
    diagnosis: '',
    severity: 'normal',
    prescriptions: '',
    recommendations: '',
    followUpDate: '',
    notes: ''
  });

  const handleVitalSignChange = (field, value) => {
    setVitalSigns(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'weight' || field === 'height' ? {
        bmi: field === 'weight' && prev.height ?
          ((value / ((prev.height/100) ** 2)).toFixed(1)) :
          field === 'height' && prev.weight ?
          ((prev.weight / ((value/100) ** 2)).toFixed(1)) : prev.bmi
      } : {})
    }));
  };

  const handleExaminationChange = (field, value) => {
    setExamination(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const startExamination = (patient) => {
    setSelectedPatient(patient);
    setIsExamining(true);
  };

  const saveExamination = () => {
    // In real app, this would save to backend
    alert('Examination saved successfully!');
    setIsExamining(false);
    setSelectedPatient(null);
    // Reset forms
    setVitalSigns({
      temperature: '', bloodPressure: '', heartRate: '', weight: '',
      height: '', bmi: '', oxygenSaturation: ''
    });
    setExamination({
      generalCondition: '', symptoms: '', diagnosis: '', severity: 'normal',
      prescriptions: '', recommendations: '', followUpDate: '', notes: ''
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'normal': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Health Checkups</h1>
              <p className="text-gray-600 mt-1">Conduct health examinations and record findings</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                <Plus className="w-5 h-5 inline mr-2" />
                New Checkup
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!isExamining ? (
          <>
            {/* Patient Search */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients by name or Health ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Schedule</h2>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-600">
                            Age: {patient.age} • Health ID: {patient.healthId}
                          </p>
                          <p className="text-sm text-gray-600">
                            Last Checkup: {patient.lastCheckup}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          patient.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {patient.status}
                        </span>
                        <button
                          onClick={() => startExamination(patient)}
                          className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                        >
                          <Stethoscope className="w-5 h-5 inline mr-2" />
                          Start Examination
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Examination Form */
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Patient Header */}
              <div className="p-6 border-b bg-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Examination: {selectedPatient?.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Health ID: {selectedPatient?.healthId} • Age: {selectedPatient?.age}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsExamining(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Vital Signs */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Vital Signs
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Temperature (°C)
                      </label>
                      <div className="relative">
                        <Thermometer className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          step="0.1"
                          value={vitalSigns.temperature}
                          onChange={(e) => handleVitalSignChange('temperature', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="98.6"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Blood Pressure
                      </label>
                      <input
                        type="text"
                        value={vitalSigns.bloodPressure}
                        onChange={(e) => handleVitalSignChange('bloodPressure', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="120/80"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Heart Rate (bpm)
                      </label>
                      <div className="relative">
                        <Heart className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          value={vitalSigns.heartRate}
                          onChange={(e) => handleVitalSignChange('heartRate', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="72"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Oxygen Saturation (%)
                      </label>
                      <input
                        type="number"
                        value={vitalSigns.oxygenSaturation}
                          onChange={(e) => handleVitalSignChange('oxygenSaturation', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="98"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weight (kg)
                      </label>
                      <div className="relative">
                        <Weight className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          step="0.1"
                          value={vitalSigns.weight}
                          onChange={(e) => handleVitalSignChange('weight', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="70.5"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Height (cm)
                      </label>
                      <div className="relative">
                        <Ruler className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          value={vitalSigns.height}
                          onChange={(e) => handleVitalSignChange('height', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="170"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        BMI
                      </label>
                      <input
                        type="text"
                        value={vitalSigns.bmi}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        placeholder="Auto-calculated"
                      />
                    </div>
                  </div>
                </div>

                {/* Examination Details */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Examination Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        General Condition
                      </label>
                      <select
                        value={examination.generalCondition}
                        onChange={(e) => handleExaminationChange('generalCondition', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select condition</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Severity Level
                      </label>
                      <select
                        value={examination.severity}
                        onChange={(e) => handleExaminationChange('severity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Symptoms
                      </label>
                      <textarea
                        value={examination.symptoms}
                        onChange={(e) => handleExaminationChange('symptoms', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe observed symptoms..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Diagnosis
                      </label>
                      <textarea
                        value={examination.diagnosis}
                        onChange={(e) => handleExaminationChange('diagnosis', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter diagnosis..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prescriptions
                      </label>
                      <textarea
                        value={examination.prescriptions}
                        onChange={(e) => handleExaminationChange('prescriptions', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter prescriptions and dosages..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Follow-up Date
                      </label>
                      <input
                        type="date"
                        value={examination.followUpDate}
                        onChange={(e) => handleExaminationChange('followUpDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Recommendations
                      </label>
                      <input
                        type="text"
                        value={examination.recommendations}
                        onChange={(e) => handleExaminationChange('recommendations', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Special recommendations..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        value={examination.notes}
                        onChange={(e) => handleExaminationChange('notes', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Additional observations or notes..."
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsExamining(false)}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveExamination}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-5 h-5 inline mr-2" />
                    Save Examination
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthCheckups;
