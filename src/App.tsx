import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { Navigation } from './components/Navigation';
import { TasksPage } from './components/TasksPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { ProgressTrackerPage } from './components/ProgressTrackerPage';
import { ProfilePage } from './components/ProfilePage';
import { RewardStorePage } from './components/RewardStorePage';
import { FriendsPage } from './components/FriendsPage';
import { supabase } from './utils/supabaseClient';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('tasks');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (!session) {
        setCurrentPage('tasks'); // Reset to default when logging out
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setCurrentPage('tasks');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <LoginPage />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navigation 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        
        {currentPage === 'tasks' && <TasksPage />}
        {currentPage === 'leaderboard' && <LeaderboardPage />}
        {currentPage === 'progress' && <ProgressTrackerPage />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'rewards' && <RewardStorePage />}
        {currentPage === 'friends' && <FriendsPage />}
      </div>
      <Toaster />
    </>
  );
}
