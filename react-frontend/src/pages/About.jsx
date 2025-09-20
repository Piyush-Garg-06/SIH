const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">About Kerala Migrant Workers Health Portal</h1>
      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-gray-700 mb-6">
          The Kerala Migrant Workers Digital Health Record Management System is a comprehensive platform designed to ensure accessible healthcare for all migrant workers in Kerala.
        </p>
        <p className="text-gray-600 mb-6">
          Our mission is to bridge the healthcare gap for migrant workers by providing centralized digital health records, real-time health monitoring, and direct access to government health schemes.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To create a healthcare ecosystem where every migrant worker has equal access to quality healthcare services and government benefits.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To digitize health records, prevent disease spread, and ensure timely medical intervention for migrant workers across Kerala.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
