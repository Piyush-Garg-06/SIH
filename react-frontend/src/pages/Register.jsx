import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    aadhaar: '',
    mobile: '',
    email: '',
    nativeState: '',
    address: '',
    district: '',
    pincode: '',
    photo: null,

    // Step 2: Health Details
    bloodGroup: '',
    height: '',
    weight: '',
    disabilities: 'no',
    chronicConditions: [],
    vaccinations: [],

    // Step 3: Employment Details
    employmentType: '',
    employerName: '',
    employerContact: '',
    workLocation: '',
    workAddress: '',
    duration: '',
    familyMembers: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Basic Information' },
    { id: 2, title: 'Health Details' },
    { id: 3, title: 'Employment Details' },
    { id: 4, title: 'Review & Submit' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      if (name === 'chronicConditions' || name === 'vaccinations') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock registration success
      alert('Registration successful! Your Health ID will be sent to your registered mobile number.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`step-indicator ${
            currentStep > step.id ? 'completed' :
            currentStep === step.id ? 'current' : 'pending'
          }`}>
            {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
          </div>
          <span className={`text-sm font-medium ml-2 ${
            currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className={`flex-auto border-t-2 mx-4 mt-4 ${
              currentStep > step.id ? 'border-green-500' : 'border-gray-200'
            }`} style={{ width: '60px' }}></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender *
          </label>
          <select
            id="gender"
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth *
          </label>
          <input
            id="dob"
            name="dob"
            type="date"
            required
            value={formData.dob}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700 mb-1">
            Aadhaar Number *
          </label>
          <input
            id="aadhaar"
            name="aadhaar"
            type="text"
            pattern="[0-9]{12}"
            required
            value={formData.aadhaar}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="12-digit Aadhaar number"
          />
        </div>
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number *
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            pattern="[0-9]{10}"
            required
            value={formData.mobile}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="10-digit mobile number"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="nativeState" className="block text-sm font-medium text-gray-700 mb-1">
            Native State *
          </label>
          <select
            id="nativeState"
            name="nativeState"
            required
            value={formData.nativeState}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select State</option>
            <option value="bihar">Bihar</option>
            <option value="west-bengal">West Bengal</option>
            <option value="odisha">Odisha</option>
            <option value="assam">Assam</option>
            <option value="up">Uttar Pradesh</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
            Blood Group *
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            required
            value={formData.bloodGroup}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm) *
          </label>
          <input
            id="height"
            name="height"
            type="number"
            required
            value={formData.height}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter height in cm"
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg) *
          </label>
          <input
            id="weight"
            name="weight"
            type="number"
            required
            value={formData.weight}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter weight in kg"
          />
        </div>
        <div>
          <label htmlFor="disabilities" className="block text-sm font-medium text-gray-700 mb-1">
            Any Disabilities?
          </label>
          <select
            id="disabilities"
            name="disabilities"
            value={formData.disabilities}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
            Employment Type *
          </label>
          <select
            id="employmentType"
            name="employmentType"
            required
            value={formData.employmentType}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Employment Type</option>
            <option value="construction">Construction Worker</option>
            <option value="factory">Factory Worker</option>
            <option value="domestic">Domestic Worker</option>
            <option value="agricultural">Agricultural Worker</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="employerName" className="block text-sm font-medium text-gray-700 mb-1">
            Employer Name *
          </label>
          <input
            id="employerName"
            name="employerName"
            type="text"
            required
            value={formData.employerName}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter employer name"
          />
        </div>
        <div>
          <label htmlFor="employerContact" className="block text-sm font-medium text-gray-700 mb-1">
            Employer Contact
          </label>
          <input
            id="employerContact"
            name="employerContact"
            type="tel"
            value={formData.employerContact}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Employer contact number"
          />
        </div>
        <div>
          <label htmlFor="workLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Work Location *
          </label>
          <input
            id="workLocation"
            name="workLocation"
            type="text"
            required
            value={formData.workLocation}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="City/District"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Duration of Employment
          </label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Duration</option>
            <option value="less-1">Less than 1 year</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="more-5">More than 5 years</option>
          </select>
        </div>
        <div>
          <label htmlFor="familyMembers" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Family Members
          </label>
          <input
            id="familyMembers"
            name="familyMembers"
            type="number"
            value={formData.familyMembers}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Number of dependents"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Review Your Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
            <p className="text-sm text-gray-600">Name: {formData.firstName} {formData.lastName}</p>
            <p className="text-sm text-gray-600">Gender: {formData.gender}</p>
            <p className="text-sm text-gray-600">DOB: {formData.dob}</p>
            <p className="text-sm text-gray-600">Mobile: {formData.mobile}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Health Information</h4>
            <p className="text-sm text-gray-600">Blood Group: {formData.bloodGroup}</p>
            <p className="text-sm text-gray-600">Height: {formData.height} cm</p>
            <p className="text-sm text-gray-600">Weight: {formData.weight} kg</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Register for Health Card</h1>
          <p className="text-gray-600">Complete your registration to get your digital health card</p>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit}>
          <div className="bg-white p-8 rounded-lg shadow-md">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ml-auto"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 ml-auto disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Registration'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
