import { Trophy, TrendingUp, User, Gift, Users, CheckSquare } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, onLogout }: NavigationProps) {
  const navItems = [
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white">✓</span>
              </div>
              <span className="text-xl" style={{ fontWeight: 700 }}>Listify</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      currentPage === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <Button onClick={onLogout} variant="outline" className="text-sm">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
