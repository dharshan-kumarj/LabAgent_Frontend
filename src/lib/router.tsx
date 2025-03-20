import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import GoogleLogin from '@/pages/GoogleLogin';
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
      }
      // Add more authenticated routes here
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);
