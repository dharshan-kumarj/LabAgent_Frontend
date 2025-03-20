import { useEffect } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { isAuthenticated } from '@/lib/auth';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface LocationState {
  notification?: {
    type: 'success' | 'error';
    message: string;
  }
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  // Handle successful login
  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Turple Space</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>
        
        {state?.notification && (
          <div className={`mb-4 p-3 rounded-md text-sm ${
            state.notification.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {state.notification.message}
          </div>
        )}
        
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        
        <div className="mt-4 text-sm text-center text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
