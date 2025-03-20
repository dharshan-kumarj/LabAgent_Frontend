import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, BookOpen, Lightbulb, ArrowRight, FileText } from 'lucide-react';
import { getLabManualById } from '@/lib/api';
import { LabManual, Problem } from '@/types/experiment';

export default function LabManualDetail() {
  const { experimentId, labManualId } = useParams<{ experimentId: string, labManualId: string }>();
  const navigate = useNavigate();
  const [labManual, setLabManual] = useState<LabManual | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLabManual = async () => {
      if (!labManualId || !experimentId) {
        setError('Lab Manual ID or Experiment ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getLabManualById(experimentId, labManualId);
        setLabManual(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch lab manual details:', err);
        setError('Failed to load lab manual details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadLabManual();
  }, [experimentId, labManualId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewProblem = (problemId: string) => {
    navigate(`/lab-manuals/${labManualId}/problems/${problemId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/experiments/${experimentId}`)}
            className="flex items-center gap-2 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Experiment
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
        ) : labManual ? (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold mb-2">{labManual.title}</h1>
              <p className="text-muted-foreground">{labManual.description}</p>
              
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  Created: {formatDate(labManual.dateCreated)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Lightbulb className="mr-1 h-4 w-4" />
                  Problems: {labManual.problems.length}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="bg-muted/30 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Lab Manual Content
                </h3>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: labManual.content.replace(/\n/g, '<br/>') 
                  }} />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Problems</h2>
              {labManual.problems.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {labManual.problems.map((problem: Problem) => (
                    <Card key={problem.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle>{problem.title}</CardTitle>
                          <Badge>Problem</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm line-clamp-2">
                          {problem.question.split('\n')[0].replace('#', '').trim()}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => handleViewProblem(problem.id)}
                        >
                          <span>Solve Problem</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No problems found for this lab manual.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Lab Manual not found.</p>
          </div>
        )}
      </main>
    </div>
  );
}
