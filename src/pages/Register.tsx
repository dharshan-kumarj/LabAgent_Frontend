import { RegisterForm } from '@/components/RegisterForm';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  
  // Handle successful registration
  const handleRegisterSuccess = () => {
    // Redirect to login page after successful registration
    navigate('/login', { 
      state: { 
        notification: {
          type: 'success',
          message: 'Account created successfully! Please sign in.' 
        } 
      } 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Turple Space</h1>
          <p className="text-muted-foreground mt-2">Create your account</p>
        </div>
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      </div>
    </div>
  );
}
