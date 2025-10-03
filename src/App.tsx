import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { TasksPage } from './components/TasksPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { ProgressTrackerPage } from './components/ProgressTrackerPage';
import { ProfilePage } from './components/ProfilePage';
import { RewardStorePage } from './components/RewardStorePage';
import { FriendsPage } from './components/FriendsPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('landing');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      
      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'tasks' && <TasksPage />}
      {currentPage === 'leaderboard' && <LeaderboardPage />}
      {currentPage === 'progress' && <ProgressTrackerPage />}
      {currentPage === 'profile' && <ProfilePage />}
      {currentPage === 'rewards' && <RewardStorePage />}
      {currentPage === 'friends' && <FriendsPage />}
    </div>
  );
}
