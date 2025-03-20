import { Button } from '@/components/ui/button';
import { logout } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Welcome to Turple Space</h3>
          <p className="text-muted-foreground">
            You are now logged in to your account. This is your dashboard where you can manage your data.
          </p>
        </div>
      </div>
    </div>
  );
}
