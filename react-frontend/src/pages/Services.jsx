import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import GovernmentSchemes from '../components/GovernmentSchemes';
import { Hospital, QrCode, Bell, WifiOff, Languages, Shield } from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  const services = [
    {
      icon: Hospital,
      title: 'Digital Health Card',
      description: 'Lifetime digital health record with QR code access at hospitals',
      features: ['Instant medical history access', 'QR code for hospitals', 'Emergency contact info', 'Blood group & allergies']
    },
    {
      icon: QrCode,
      title: 'Health Card Scanning',
      description: 'Scan QR codes at hospitals for instant patient data access',
      features: ['Hospital integration', 'Real-time updates', 'Secure data sharing', 'Multi-language support']
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Automated alerts for health checkups, vaccinations, and scheme benefits',
      features: ['Appointment reminders', 'Health checkup alerts', 'Scheme notifications', 'Emergency alerts']
    },
    {
      icon: WifiOff,
      title: 'Offline Data Capture',
      description: 'Collect health data offline and sync when internet is available',
      features: ['Offline form filling', 'Auto-sync when online', 'Data validation', 'Progress tracking']
    },
    {
      icon: Languages,
      title: 'Multi-language Support',
      description: 'Complete system in Hindi, Bengali, Odia, Malayalam, and English',
      features: ['Regional languages', 'Voice assistance', 'Document translation', 'Cultural adaptation']
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Role-based access control with end-to-end data encryption',
      features: ['Encrypted data storage', 'Role-based permissions', 'Audit trails', 'GDPR compliance']
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Service Overview' },
    { id: 'schemes', label: 'Government Schemes' },
    { id: 'features', label: 'Key Features' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white text-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4 text-gray-900"
          >
            Comprehensive Healthcare Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Complete digital healthcare solution for migrant workers with government scheme integration,
            multilingual support, and offline capabilities
          </motion.p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-gray-800 border-b-2 border-gray-800'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <Icon className="text-gray-600 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'schemes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GovernmentSchemes />
          </motion.div>
        )}

        {activeTab === 'features' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Core Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Healthcare Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">For Migrant Workers</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3"></div>
                      <span>Digital health card with lifetime validity</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3"></div>
                      <span>Access to government health schemes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3"></div>
                      <span>Medical history tracking across states</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3"></div>
                      <span>Emergency contact and blood group info</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">For Healthcare Providers</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <span>Instant patient history access via QR scan</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <span>Real-time medical record updates</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <span>Scheme eligibility verification</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <span>Automated reporting and compliance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Technical Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <WifiOff className="text-blue-600 w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Offline-First</h3>
                  <p className="text-gray-600 text-sm">Works without internet, syncs when connected</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-blue-600 w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
                  <p className="text-gray-600 text-sm">End-to-end encryption with role-based access</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Languages className="text-blue-600 w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multilingual</h3>
                  <p className="text-gray-600 text-sm">5 languages with regional dialects support</p>
                </div>
              </div>
            </motion.div>

            {/* Implementation Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white p-8 rounded-xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">✅</div>
                  <h3 className="font-semibold text-gray-900">Digital Health Cards</h3>
                  <p className="text-sm text-gray-600">Implemented</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">✅</div>
                  <h3 className="font-semibold text-gray-900">QR Code System</h3>
                  <p className="text-sm text-gray-600">Implemented</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">✅</div>
                  <h3 className="font-semibold text-gray-900">Multilingual Support</h3>
                  <p className="text-sm text-gray-600">Implemented</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">🚧</div>
                  <h3 className="font-semibold text-gray-900">Offline Sync</h3>
                  <p className="text-sm text-gray-600">In Development</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Services;
