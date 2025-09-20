import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle, TrendingUp, Users, Activity,
  Heart, Thermometer, Stethoscope, Brain,
  Shield, Zap, Search, Filter, Eye, Edit,
  Save, Download, BarChart3, PieChart
} from 'lucide-react';
import { useState } from 'react';

const SeverityAssessment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [assessmentMode, setAssessmentMode] = useState(false);

  if (!user || user.userType !== 'doctor') {
    navigate('/login');
    return null;
  }

  // Mock patient data with severity assessments
  const patients = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      healthId: 'KL2024001',
      age: 32,
      currentSeverity: 'moderate',
      lastAssessment: '2024-01-20',
      conditions: ['Hypertension', 'Vitamin D Deficiency'],
      vitalSigns: {
        bloodPressure: '150/90',
        heartRate: 85,
        temperature: 98.6,
        oxygenSat: 97
      },
      riskFactors: ['Age > 30', 'Family History', 'Sedentary Lifestyle'],
      compliance: 85,
      trend: 'stable'
    },
    {
      id: 2,
      name: 'Amit Singh',
      healthId: 'KL2024003',
      age: 35,
      currentSeverity: 'high',
      lastAssessment: '2024-01-18',
      conditions: ['Diabetes', 'Hypertension', 'Respiratory Issues'],
      vitalSigns: {
        bloodPressure: '170/100',
        heartRate: 95,
        temperature: 99.2,
        oxygenSat: 94
      },
      riskFactors: ['Multiple Conditions', 'Poor Compliance', 'Smoking'],
      compliance: 60,
      trend: 'worsening'
    },
    {
      id: 3,
      name: 'Suresh Patel',
      healthId: 'KL2024002',
      age: 28,
      currentSeverity: 'normal',
      lastAssessment: '2024-01-15',
      conditions: ['Normal Health'],
      vitalSigns: {
        bloodPressure: '120/80',
        heartRate: 72,
        temperature: 98.4,
        oxygenSat: 98
      },
      riskFactors: ['None'],
      compliance: 95,
      trend: 'improving'
    }
  ];

  const [assessment, setAssessment] = useState({
    severity: 'normal',
    riskLevel: 'low',
    priority: 'routine',
    recommendations: '',
    followUp: '2_weeks',
    notes: ''
  });

  const severityCriteria = {
    normal: {
      color: 'bg-green-100 text-green-800 border-green-200',
      description: 'No significant health issues',
      criteria: ['Normal vital signs', 'No chronic conditions', 'Good compliance']
    },
    low: {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      description: 'Minor health concerns',
      criteria: ['Slightly elevated vitals', 'Single minor condition', 'Good compliance']
    },
    moderate: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      description: 'Moderate health issues requiring attention',
      criteria: ['Elevated vitals', 'Multiple conditions', 'Fair compliance']
    },
    high: {
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      description: 'Significant health issues',
      criteria: ['High vitals', 'Chronic conditions', 'Poor compliance', 'Risk factors']
    },
    critical: {
      color: 'bg-red-100 text-red-800 border-red-200',
      description: 'Severe health issues requiring immediate attention',
      criteria: ['Very high vitals', 'Multiple severe conditions', 'Very poor compliance', 'High risk factors']
    }
  };

  const startAssessment = (patient) => {
    setSelectedPatient(patient);
    setAssessmentMode(true);
    // Pre-populate assessment based on current data
    setAssessment({
      severity: patient.currentSeverity,
      riskLevel: patient.currentSeverity === 'critical' ? 'high' : patient.currentSeverity === 'high' ? 'medium' : 'low',
      priority: patient.currentSeverity === 'critical' ? 'urgent' : patient.currentSeverity === 'high' ? 'high' : 'routine',
      recommendations: '',
      followUp: patient.currentSeverity === 'critical' ? 'immediate' : patient.currentSeverity === 'high' ? '1_week' : '2_weeks',
      notes: ''
    });
  };

  const saveAssessment = () => {
    // In real app, this would save to backend
    alert('Severity assessment saved successfully!');
    setAssessmentMode(false);
    setSelectedPatient(null);
  };

  const getSeverityColor = (severity) => {
    return severityCriteria[severity]?.color || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'worsening': return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />;
      case 'stable': return <Activity className="w-4 h-4 text-blue-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const stats = {
    total: patients.length,
    normal: patients.filter(p => p.currentSeverity === 'normal').length,
    low: patients.filter(p => p.currentSeverity === 'low').length,
    moderate: patients.filter(p => p.currentSeverity === 'moderate').length,
    high: patients.filter(p => p.currentSeverity === 'high').length,
    critical: patients.filter(p => p.currentSeverity === 'critical').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Severity Assessment</h1>
              <p className="text-gray-600 mt-1">Assess and categorize patient health severity levels</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                <BarChart3 className="w-5 h-5 inline mr-2" />
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!assessmentMode ? (
          <>
            {/* Severity Distribution */}
            <div className="grid md:grid-cols-5 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Normal</p>
                    <p className="text-2xl font-bold text-green-600">{stats.normal}</p>
                  </div>
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Low</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.low}</p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Moderate</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.moderate}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">High</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.high}</p>
                  </div>
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Critical</p>
                    <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
                  </div>
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </div>

            {/* Patient List */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Patient Assessments</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {patients.map((patient) => (
                  <div key={patient.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-600">
                            Health ID: {patient.healthId} • Age: {patient.age}
                          </p>
                          <p className="text-sm text-gray-600">
                            Last Assessment: {patient.lastAssessment}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(patient.trend)}
                          <span className="text-sm text-gray-600 capitalize">{patient.trend}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(patient.currentSeverity)}`}>
                          {patient.currentSeverity}
                        </span>
                        <button
                          onClick={() => startAssessment(patient)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                        >
                          Assess
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Vital Signs</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>BP: {patient.vitalSigns.bloodPressure}</p>
                          <p>HR: {patient.vitalSigns.heartRate} bpm</p>
                          <p>Temp: {patient.vitalSigns.temperature}°F</p>
                          <p>O2: {patient.vitalSigns.oxygenSat}%</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Conditions</h4>
                        <div className="flex flex-wrap gap-1">
                          {patient.conditions.map((condition, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Risk Factors</h4>
                        <div className="flex flex-wrap gap-1">
                          {patient.riskFactors.map((risk, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                              {risk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="text-sm text-gray-600">Compliance:</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${patient.compliance}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{patient.compliance}%</span>
                      </div>

                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          <Eye className="w-4 h-4 inline mr-1" />
                          View History
                        </button>
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                          <Download className="w-4 h-4 inline mr-1" />
                          Export
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Assessment Form */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Patient Header */}
              <div className="p-6 border-b bg-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Severity Assessment: {selectedPatient?.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Health ID: {selectedPatient?.healthId} • Age: {selectedPatient?.age}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAssessmentMode(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Current Vitals Display */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Vital Signs</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Heart className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-medium text-gray-700">Blood Pressure</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{selectedPatient?.vitalSigns.bloodPressure}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Heart Rate</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{selectedPatient?.vitalSigns.heartRate} bpm</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Thermometer className="w-5 h-5 text-orange-600" />
                        <span className="text-sm font-medium text-gray-700">Temperature</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{selectedPatient?.vitalSigns.temperature}°F</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Stethoscope className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Oxygen Sat</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{selectedPatient?.vitalSigns.oxygenSat}%</p>
                    </div>
                  </div>
                </div>

                {/* Assessment Form */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Severity Assessment</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Severity Level
                      </label>
                      <select
                        value={assessment.severity}
                        onChange={(e) => setAssessment({
                          ...assessment,
                          severity: e.target.value,
                          riskLevel: e.target.value === 'critical' ? 'high' : e.target.value === 'high' ? 'medium' : 'low',
                          priority: e.target.value === 'critical' ? 'urgent' : e.target.value === 'high' ? 'high' : 'routine'
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                      <p className="text-xs text-gray-600 mt-1">
                        {severityCriteria[assessment.severity]?.description}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Risk Level
                      </label>
                      <select
                        value={assessment.riskLevel}
                        onChange={(e) => setAssessment({...assessment, riskLevel: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">Low Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="high">High Risk</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={assessment.priority}
                        onChange={(e) => setAssessment({...assessment, priority: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="routine">Routine</option>
                        <option value="high">High Priority</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Follow-up Schedule
                      </label>
                      <select
                        value={assessment.followUp}
                        onChange={(e) => setAssessment({...assessment, followUp: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="immediate">Immediate</option>
                        <option value="1_week">1 Week</option>
                        <option value="2_weeks">2 Weeks</option>
                        <option value="1_month">1 Month</option>
                        <option value="3_months">3 Months</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Severity Criteria Display */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Assessment Criteria for {assessment.severity}:</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {severityCriteria[assessment.severity]?.criteria.map((criterion, index) => (
                        <li key={index}>{criterion}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recommendations & Treatment Plan
                  </label>
                  <textarea
                    value={assessment.recommendations}
                    onChange={(e) => setAssessment({...assessment, recommendations: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter treatment recommendations, lifestyle changes, medication adjustments..."
                  />
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={assessment.notes}
                    onChange={(e) => setAssessment({...assessment, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional observations or notes..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setAssessmentMode(false)}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveAssessment}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-5 h-5 inline mr-2" />
                    Save Assessment
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

export default SeverityAssessment;
