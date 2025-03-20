import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, BookOpen, FileText, Clock } from 'lucide-react';
import { getExperimentById } from '@/lib/api';
import { Experiment, LabManual } from '@/types/experiment';

export default function ExperimentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExperiment = async () => {
      if (!id) {
        setError('Experiment ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getExperimentById(id);
        setExperiment(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch experiment details:', err);
        setError('Failed to load experiment details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadExperiment();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };

  const handleViewLabManual = (labManualId: string) => {
    navigate(`/experiments/${id}/lab-manuals/${labManualId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Experiments
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md">
            {error}
          </div>
        ) : experiment ? (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{experiment.title}</h1>
              <p className="text-muted-foreground">{experiment.description}</p>
              
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  Created: {formatDate(experiment.dateCreated)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="mr-1 h-4 w-4" />
                  Lab Manuals: {experiment.labManuals.length}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold mb-4">Lab Manuals</h2>
              <div className="grid grid-cols-1 gap-6">
                {experiment.labManuals.map((manual: LabManual) => (
                  <Card key={manual.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{manual.title}</CardTitle>
                          <CardDescription className="mt-1">{manual.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {getTimeAgo(manual.dateCreated)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>Created: {formatDate(manual.dateCreated)}</span>
                      </div>
                      
                      <div className="border rounded-md p-4 bg-muted/30">
                        <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                        <div className="text-sm line-clamp-3">
                          {manual.content.split('\n').slice(0, 3).join('\n')}
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleViewLabManual(manual.id)}
                      >
                        View Lab Manual
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Experiment not found.</p>
          </div>
        )}
      </main>
    </div>
  );
}
