import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Loader } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
        className="text-5xl font-bold text-center text-gray-800 mb-12"
      >
        Contact Us
      </motion.h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white p-8 rounded-lg border border-gray-200 shadow-2xl hover:shadow-blue-200 transition-shadow duration-300"
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">Get in Touch</h2>
          <motion.div className="space-y-6">
            <motion.div whileHover={{ scale: 1.05, x: 5, borderColor: '#3b82f6' }} className="flex items-center p-2 rounded-md border border-transparent transition-all duration-300">
              <Phone className="w-6 h-6 text-blue-500 mr-4" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">0471-1234567</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, x: 5, borderColor: '#3b82f6' }} className="flex items-center p-2 rounded-md border border-transparent transition-all duration-300">
              <Mail className="w-6 h-6 text-blue-500 mr-4" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">healthportal@kerala.gov.in</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, x: 5, borderColor: '#3b82f6' }} className="flex items-start p-2 rounded-md border border-transparent transition-all duration-300">
              <MapPin className="w-6 h-6 text-blue-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">Health Department, Government of Kerala, Thiruvananthapuram</p>
              </div>
            </motion.div>
          </motion.div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Support Hours</h3>
            <p className="text-gray-600">
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 9:00 AM - 1:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-white p-8 rounded-lg border border-gray-200 shadow-2xl hover:shadow-green-200 transition-shadow duration-300"
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <motion.label htmlFor="name" whileHover={{ scale: 1.02 }} className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
                Full Name
              </motion.label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
                whileHover={{ borderColor: '#93c5fd' }}
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.label htmlFor="email" whileHover={{ scale: 1.02 }} className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
                Email Address
              </motion.label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
                whileHover={{ borderColor: '#93c5fd' }}
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.label htmlFor="message" whileHover={{ scale: 1.02 }} className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
                Message
              </motion.label>
              <motion.textarea
                whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
                whileHover={{ borderColor: '#93c5fd' }}
                name="message"
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              ></motion.textarea>
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(59, 130, 246, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
              >
                <AnimatePresence>
                  {isSubmitting ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <Loader className="animate-spin" />
                    </motion.div>
                  ) : (
                    'Send Message'
                  )}
                </AnimatePresence>
                Submit
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 100 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Location</h2>
        <div className="w-full h-96 bg-gray-200 rounded-lg border border-gray-200 shadow-2xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.933950900543!2d76.9499080147827!3d8.50501699389618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb7c2f3c0d2d%3A0x3b05bb7c2f3c0d2d!2sSecretariat%2C%20Thiruvananthapuram%2C%2C%20Kerala!5e0!3m2!1sen!2sin!4v1678886450142!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
