import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { logout } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { Experiment } from '@/types/experiment';
import { CalendarIcon, BookOpenIcon, ArrowRightIcon } from 'lucide-react';
import { mockExperiments } from '@/lib/mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  useEffect(() => {
    // Simulate loading with a small delay
    const timer = setTimeout(() => {
      setExperiments(mockExperiments);
      setLoading(false);
    }, 500); // Add a small delay to simulate loading
    
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Turple Space</h1>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">My Experiments</h2>
            <p className="text-muted-foreground mt-1">
              Browse through your laboratory experiments
            </p>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : experiments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No experiments found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((experiment) => (
              <Card key={experiment.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{experiment.title}</CardTitle>
                  <CardDescription>{experiment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-1 h-4 w-4" />
                      Created: {formatDate(experiment.dateCreated)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpenIcon className="mr-1 h-4 w-4" />
                      Lab Manuals: {experiment.labManuals.length}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Lab Manuals:</h4>
                    <ul className="space-y-1">
                      {experiment.labManuals.slice(0, 2).map((manual) => (
                        <li key={manual.id} className="text-sm">
                          • {manual.title}
                          <Badge className="ml-2 text-xs" variant="outline">
                            {manual.problems.length} {manual.problems.length === 1 ? 'problem' : 'problems'}
                          </Badge>
                        </li>
                      ))}
                      {experiment.labManuals.length > 2 && (
                        <li className="text-sm text-muted-foreground">
                          • And {experiment.labManuals.length - 2} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default">
                    <span>View Experiment</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
