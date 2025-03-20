import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { ArrowLeft, Lightbulb, Code, Info } from 'lucide-react';
import { generateSampleProblem } from '@/lib/sampleProblem';

export default function ProblemDetail() {
  const { labManualId, problemId } = useParams<{ labManualId: string, problemId: string }>();
  const navigate = useNavigate();
  const [problem, setProblem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('problem');

  useEffect(() => {
    // For now, we'll generate a sample problem with different types
    const problemTypes = ['Array', 'String', 'Tree', 'Graph', 'Dynamic Programming'];
    const randomType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const sampleProblem = generateSampleProblem(problemId || 'prob-001', randomType);
      setProblem(sampleProblem);
      setLoading(false);
    }, 500);
  }, [problemId]);

  const renderMarkdown = (markdown: string) => {
    // This is a simple implementation - in a real app you'd use a markdown renderer
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: markdown.replace(/\n/g, '<br/>') }} />
      </div>
    );
  };

  const renderCode = (code: string) => {
    // Extract code content from the markdown code block
    const codeMatch = code.match(/```([a-z]*)\n([\s\S]*?)```/);
    if (!codeMatch) return <pre>{code}</pre>;
    
    const [, language, codeContent] = codeMatch;
    
    return (
      <div className="relative">
        <div className="absolute top-2 right-3 text-xs text-muted-foreground">
          {language}
        </div>
        <pre className="bg-muted/50 p-4 rounded-md text-sm overflow-auto">
          <code>{codeContent}</code>
        </pre>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Lab Manual
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : problem ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
              {problem.labManual && (
                <div className="text-muted-foreground">
                  From <span className="font-medium">{problem.labManual.title}</span>
                  {problem.labManual.experiment && (
                    <> - {problem.labManual.experiment.title}</>
                  )}
                </div>
              )}
            </div>

            <Separator />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="problem" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Problem
                </TabsTrigger>
                <TabsTrigger value="hints" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Hints
                </TabsTrigger>
                <TabsTrigger value="solution" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Solution
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="problem" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    {renderMarkdown(problem.question)}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="hints" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    {renderMarkdown(problem.hints)}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="solution" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    {renderCode(problem.solution)}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Problem not found.</p>
          </div>
        )}
      </main>
    </div>
  );
}
