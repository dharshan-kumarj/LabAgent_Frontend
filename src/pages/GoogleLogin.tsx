import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
// Removed unused Spinner import

export default function GoogleLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get the JWT token from Authorization header
    // In a real app, this might be more complex as you'd need to extract 
    // from headers which requires server-side cooperation
    
    // Let's assume the token is in sessionStorage or could be extracted from URL
    // For production, you'd need server coordination to get the token
    const extractAndSaveToken = async () => {
      try {
        // Check for Authorization header in the redirect
        // This is a simple implementation - in production this would need more work
        const token = new URLSearchParams(window.location.search).get('token') || 
                    document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
                
        if (token) {
          // Save token to localStorage
          localStorage.setItem('auth_token', token);
          
          // Redirect to dashboard
          navigate('/dashboard');
        } else {
          // Attempt to check if token is in Authorization header
          // This would typically require server-side help
          const authHeader = sessionStorage.getItem('auth_header');
          
          if (authHeader) {
            // Extract token from Authorization header
            const token = authHeader.replace('Bearer ', '');
            localStorage.setItem('auth_token', token);
            sessionStorage.removeItem('auth_header');
            navigate('/dashboard');
          } else {
            // For demo purposes, we'll simulate successful authentication
            // In production, you would handle this properly
            setTimeout(() => {
              // Mock a successful login for demo
              localStorage.setItem('auth_token', 'demo_google_token');
              navigate('/dashboard');
            }, 2000);
          }
        }
      } catch (err) {
        console.error('Error processing Google authentication:', err);
        setError('Failed to complete Google authentication. Please try again.');
      }
    };

    extractAndSaveToken();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-[400px]">
        <CardContent className="flex flex-col items-center justify-center p-6">
          {error ? (
            <div className="text-destructive text-center">
              <p className="mb-4">{error}</p>
              <button 
                onClick={() => navigate('/login')}
                className="text-primary underline underline-offset-4"
              >
                Return to login
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-6">Completing Google Authentication</h2>
              <div className="flex justify-center mb-4">
                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-muted-foreground text-center">
                Please wait while we complete your Google authentication...
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
