import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConversation } from '@/context/ConversationContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useConversation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (!user) {
        // Redirect to login if not authenticated
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If we're not loading and there's no user, redirect to login
  if (!user) {
    return null;
  }

  return <>{children}</>;
};
