import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  AlertTriangle,
  UserCheck,
  FileText,
  QrCode,
  Calendar,
  Stethoscope,
  Users,
  Shield,
  Bell,
  CheckCircle,
  ArrowRight,
  Clock
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const mandatorySteps = [
    {
      step: 1,
      icon: UserCheck,
      title: 'Mandatory Registration',
      description: 'All migrant workers must register on the portal before starting work in Kerala.',
      color: 'red',
      required: true
    },
    {
      step: 2,
      icon: FileText,
      title: 'Health Record Submission',
      description: 'Submit complete medical history, vaccination records, and current health status.',
      color: 'orange',
      required: true
    },
    {
      step: 3,
      icon: QrCode,
      title: 'Health ID & QR Code Generation',
      description: 'Receive unique Health ID and QR code for instant hospital access.',
      color: 'blue',
      required: true
    },
    {
      step: 4,
      icon: Calendar,
      title: 'Scheduled Health Checkups',
      description: 'Regular health checkups scheduled via SMS notifications.',
      color: 'green',
      required: true
    }
  ];

  const systemFeatures = [
    {
      icon: Stethoscope,
      title: 'Doctor Categorization',
      description: 'Doctors categorize patients by severity levels and update medical records.',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Admin Monitoring',
      description: 'Admin monitors worker health severity and connects workers with appropriate doctors.',
      color: 'indigo'
    },
    {
      icon: Bell,
      title: 'SMS Notifications',
      description: 'Automated notifications for checkups, results, and health alerts.',
      color: 'yellow'
    },
    {
      icon: Users,
      title: 'Employer Integration',
      description: 'Employers can verify worker health status and compliance.',
      color: 'green'
    }
  ];

  const workerBenefits = [
    'Free health checkups and consultations',
    'Access to government health schemes',
    'Emergency medical assistance',
    'Medical history tracking across Kerala',
    'Multilingual support in native languages',
    'QR code for instant hospital access'
  ];

  const employerBenefits = [
    'Verified worker health status',
    'Reduced workplace health incidents',
    'Compliance with labor regulations',
    'Access to worker medical records',
    'Health monitoring and reporting',
    'Reduced medical leave costs'
  ];

  return (
    <div>
      {/* Mandatory Registration Alert */}
      {!user && (
        <div className="bg-red-600 text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 mr-3" />
              <div className="text-center">
                <h3 className="font-bold text-lg">MANDATORY REGISTRATION REQUIRED</h3>
                <p className="text-sm">All migrant workers must register and submit health records before starting work in Kerala</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Kerala Migrant Workers Health Portal
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              Mandatory digital health record system for all migrant workers in Kerala.
              Register, submit health records, and get your Health ID before starting work.
            </p>

            {!user ? (
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/register"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center transition-colors"
                >
                  <UserCheck className="w-6 h-6 mr-3" />
                  Start Mandatory Registration
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  Login to Portal
                </Link>
              </div>
            ) : (
              <div className="bg-white text-blue-800 p-6 rounded-lg inline-block">
                <h3 className="font-bold text-xl mb-2">Welcome back, {user.name}!</h3>
                <p className="text-lg">Access your health dashboard and records</p>
                <Link
                  to="/dashboard"
                  className="bg-blue-600 text-white px-6 py-2 rounded mt-4 inline-block hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mandatory Steps Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">
            Mandatory Registration Process
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            All migrant workers must complete these steps before starting work in Kerala
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mandatorySteps.map((step, index) => {
              const Icon = step.icon;
              const colorClasses = {
                red: 'bg-red-100 text-red-600 border-red-200',
                orange: 'bg-orange-100 text-orange-600 border-orange-200',
                blue: 'bg-blue-100 text-blue-600 border-blue-200',
                green: 'bg-green-100 text-green-600 border-green-200'
              };

              return (
                <div key={index} className="relative">
                  <div className={`border-2 rounded-lg p-6 text-center h-full ${colorClasses[step.color]}`}>
                    <div className="flex justify-center mb-4">
                      <div className="bg-white p-3 rounded-full">
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                    {step.required && (
                      <div className="mt-4">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          REQUIRED
                        </span>
                      </div>
                    )}
                  </div>
                  {index < mandatorySteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* System Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            System Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {systemFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                purple: 'bg-purple-100 text-purple-600',
                indigo: 'bg-indigo-100 text-indigo-600',
                yellow: 'bg-yellow-100 text-yellow-600',
                green: 'bg-green-100 text-green-600'
              };

              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className={`w-16 h-16 ${colorClasses[feature.color]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Benefits for Stakeholders
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Worker Benefits */}
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center">
                <Users className="w-8 h-8 mr-3" />
                For Migrant Workers
              </h3>
              <ul className="space-y-3">
                {workerBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Employer Benefits */}
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-green-900 mb-6 flex items-center">
                <Shield className="w-8 h-8 mr-3" />
                For Employers
              </h3>
              <ul className="space-y-3">
                {employerBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">
            Important Notice
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 text-lg">
            <p>
              <strong>Mandatory Registration:</strong> All migrant workers must register on this portal and submit their health records before starting work in Kerala.
            </p>
            <p>
              <strong>Health Checkups:</strong> Workers will be called for mandatory health checkups via SMS notifications. Non-compliance may result in work restrictions.
            </p>
            <p>
              <strong>Medical Records:</strong> All medical history, prescriptions, and test results will be updated on the portal for better healthcare delivery.
            </p>
            <p>
              <strong>Emergency Access:</strong> Health ID and QR code provide instant access to medical records during emergencies.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Start Your Registration Now
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Complete your mandatory health registration and get your Health ID to start working in Kerala safely.
          </p>
          {!user && (
            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center transition-colors"
            >
              <Clock className="w-6 h-6 mr-3" />
              Register Now - It's Mandatory
              <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
