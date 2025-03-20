import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import GoogleLogin from '@/pages/GoogleLogin';
import ExperimentDetail from '@/pages/ExperimentDetail';
import LabManualDetail from '@/pages/LabManualDetail';
import ProblemDetail from '@/pages/ProblemDetail';
import { isAuthenticated } from './auth';

// Protected route wrapper component
const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

// Public route wrapper component (accessible only when not authenticated)
const PublicRoute = () => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Outlet />;
};

// App routes configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
  // Special route for Google OAuth callback
  {
    path: '/googlelogin',
    element: <GoogleLogin />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/experiments/:id',
        element: <ExperimentDetail />
      },
      {
        path: '/experiments/:experimentId/lab-manuals/:labManualId',
        element: <LabManualDetail />
      },
      {
        path: '/lab-manuals/:labManualId/problems/:problemId',
        element: <ProblemDetail />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);
