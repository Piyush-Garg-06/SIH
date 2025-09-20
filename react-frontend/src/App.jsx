import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Services from './pages/Services';
import HealthCard from './pages/HealthCard';
import Doctors from './pages/Doctors';
import Employers from './pages/Employers';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import HealthRecords from './pages/HealthRecords';
import Appointments from './pages/Appointments';
import Notifications from './pages/Notifications';
import Patients from './pages/Patients';
import HealthCheckups from './pages/HealthCheckups';
import Reports from './pages/Reports';
import SeverityAssessment from './pages/SeverityAssessment';
import Workers from './pages/Workers';
// import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/healthcard" element={<HealthCard />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/employers" element={<Employers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/health-records" element={<HealthRecords />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/health-checkups" element={<HealthCheckups />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/severity-assessment" element={<SeverityAssessment />} />
              <Route path="/workers" element={<Workers />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
