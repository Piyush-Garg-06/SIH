const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Contact Us</h1>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-medium w-20">Phone:</span>
                <span>0471-1234567</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-20">Email:</span>
                <span>healthportal@kerala.gov.in</span>
              </div>
              <div className="flex items-start">
                <span className="font-medium w-20">Address:</span>
                <span>Health Department, Government of Kerala, Thiruvananthapuram</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Support Hours</h2>
            <p className="text-gray-600">
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 9:00 AM - 1:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
