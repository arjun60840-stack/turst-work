import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Workers from './pages/Workers';
import WorkerDetail from './pages/WorkerDetail';
import Customers from './pages/Customers';
import Cooperatives from './pages/Cooperatives';
import CooperativeDetail from './pages/CooperativeDetail';
import Verification from './pages/Verification';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Payments from './pages/Payments';
import Complaints from './pages/Complaints';
import ComplaintDetail from './pages/ComplaintDetail';
import DemandAnalytics from './pages/DemandAnalytics';
import AuditLogs from './pages/AuditLogs';
import CustomerPortal from './pages/CustomerPortal';
import WorkerPortal from './pages/WorkerPortal';
import TechnicalApproach from './pages/TechnicalApproach';
import Welfare from './pages/Welfare';
import LandingPage from './pages/LandingPage';
import WorkerRegistration from './pages/WorkerRegistration';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public High-Impact Landing Page & Onboarding */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/worker-register" element={<WorkerRegistration />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* User Experience Portals */}
          <Route path="/customer-portal" element={<CustomerPortal />} />
          <Route path="/worker-portal" element={<WorkerPortal />} />
          <Route path="/technical-approach" element={<TechnicalApproach />} />
          <Route path="/welfare" element={<Welfare />} />

          {/* Admin Operations Pages */}
          <Route path="/workers" element={<Workers />} />
          <Route path="/workers/:id" element={<WorkerDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/cooperatives" element={<Cooperatives />} />
          <Route path="/cooperatives/:id" element={<CooperativeDetail />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/complaints/:id" element={<ComplaintDetail />} />
          <Route path="/analytics" element={<DemandAnalytics />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
