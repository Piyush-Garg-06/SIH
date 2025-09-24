import { Target, ShieldCheck, HeartHandshake, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`bg-gray-50 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto py-16 px-4">
        {/* Hero Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ease-in-out bg-gradient-to-r from-blue-900 to-green-600 bg-clip-text text-transparent ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            About the Kerala Migrant Workers Health Portal
          </h1>
          <p className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 ease-in-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            A pioneering initiative by the Government of Kerala to ensure the health and well-being of every migrant worker in the state.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <p className={`text-lg text-gray-800 mb-6 transition-all duration-700 ease-in-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            The Kerala Migrant Workers Digital Health Record Management System is a comprehensive platform designed to ensure accessible, equitable, and quality healthcare for all migrant workers contributing to the state's economy.
          </p>
          <p className={`text-gray-600 mb-12 transition-all duration-700 ease-in-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Our goal is to bridge the healthcare gap by providing centralized digital health records, enabling real-time health monitoring, and offering direct access to government health schemes, thereby creating a safer and healthier environment for everyone.
          </p>

          {/* Vision and Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className={`bg-blue-50 border border-blue-200 p-8 rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:bg-blue-100 hover:border-blue-300 delay-500 animate-shadow-pulse-blue ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="flex items-center text-blue-900 mb-4">
                <Target className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-semibold">Our Vision</h3>
              </div>
              <p className="text-gray-700">
                To create an inclusive healthcare ecosystem where every migrant worker has seamless access to quality healthcare services and government benefits, fostering a healthy and productive workforce.
              </p>
            </div>
            <div className={`bg-green-50 border border-green-200 p-8 rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:bg-green-100 hover:border-green-300 delay-600 animate-shadow-pulse-green ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="flex items-center text-green-900 mb-4">
                <ShieldCheck className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-semibold">Our Mission</h3>
              </div>
              <p className="text-gray-700">
                To digitize health records, prevent the spread of communicable diseases, and ensure timely medical intervention for migrant workers across Kerala through a robust and user-friendly digital platform.
              </p>
            </div>
          </div>

          {/* Key Objectives */}
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold text-blue-900 mb-8 transition-all duration-700 ease-in-out delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Our Key Objectives
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className={`group bg-gray-100 border border-gray-200 p-6 rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:bg-white hover:border-gray-300 delay-[800ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 p-4 rounded-full mb-4 transition-colors duration-300 group-hover:bg-purple-200 animate-breathing">
                    <HeartHandshake className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Ensure Access</h4>
                  <p className="text-gray-600">Provide every worker with a unique Health ID for easy access to medical services anywhere in Kerala.</p>
                </div>
              </div>
              <div className={`group bg-gray-100 border border-gray-200 p-6 rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:bg-white hover:border-gray-300 delay-[900ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex flex-col items-center">
                  <div className="bg-red-100 p-4 rounded-full mb-4 transition-colors duration-300 group-hover:bg-red-200 animate-breathing" style={{animationDelay: '0.5s'}}>
                    <ShieldCheck className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Prevent Disease</h4>
                  <p className="text-gray-600">Monitor health trends and manage outbreaks of communicable diseases effectively.</p>
                </div>
              </div>
              <div className={`group bg-gray-100 border border-gray-200 p-6 rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:bg-white hover:border-gray-300 delay-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex flex-col items-center">
                  <div className="bg-indigo-100 p-4 rounded-full mb-4 transition-colors duration-300 group-hover:bg-indigo-200 animate-breathing" style={{animationDelay: '1s'}}>
                    <Users className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Integrate Stakeholders</h4>
                  <p className="text-gray-600">Connect workers, employers, doctors, and government agencies on a single, unified platform.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
