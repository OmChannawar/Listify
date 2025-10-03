import { Trophy, Medal, Crown, Zap, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';

export function LeaderboardPage() {
  const tiers = [
    { name: 'Legendary', color: 'from-yellow-400 via-orange-500 to-red-500', minPoints: 10000, icon: Crown },
    { name: 'Ruby', color: 'from-red-500 to-pink-600', minPoints: 7500, icon: Trophy },
    { name: 'Platinum', color: 'from-slate-300 to-slate-500', minPoints: 5000, icon: Trophy },
    { name: 'Gold', color: 'from-yellow-400 to-yellow-600', minPoints: 3000, icon: Medal },
    { name: 'Silver', color: 'from-slate-300 to-slate-400', minPoints: 1500, icon: Medal },
    { name: 'Copper', color: 'from-orange-600 to-orange-800', minPoints: 750, icon: Medal },
    { name: 'Iron', color: 'from-gray-400 to-gray-600', minPoints: 300, icon: Medal },
    { name: 'Bronze', color: 'from-amber-600 to-amber-800', minPoints: 0, icon: Medal },
  ];

  const globalLeaderboard = [
    { rank: 1, name: 'Sarah Chen', userId: '@sarahc', points: 12450, tier: 'Legendary', tasksCompleted: 1245, streak: 89, color: 'bg-gradient-to-r from-yellow-400 to-red-500' },
    { rank: 2, name: 'Alex Kumar', userId: '@alexk', points: 11280, tier: 'Legendary', tasksCompleted: 1089, streak: 76, color: 'bg-gradient-to-r from-yellow-400 to-orange-500' },
    { rank: 3, name: 'Jamie Foster', userId: '@jamiefoster', points: 10920, tier: 'Legendary', tasksCompleted: 1024, streak: 65, color: 'bg-gradient-to-r from-yellow-500 to-red-500' },
    { rank: 4, name: 'Morgan Lee', userId: '@morganlee', points: 8650, tier: 'Ruby', tasksCompleted: 892, streak: 54, color: 'bg-gradient-to-r from-red-500 to-pink-600' },
    { rank: 5, name: 'Riley Johnson', userId: '@rileyj', points: 7890, tier: 'Ruby', tasksCompleted: 821, streak: 48, color: 'bg-gradient-to-r from-red-500 to-pink-600' },
    { rank: 6, name: 'Taylor Smith', userId: '@tsmith', points: 6234, tier: 'Platinum', tasksCompleted: 678, streak: 42, color: 'bg-gradient-to-r from-slate-300 to-slate-500' },
    { rank: 7, name: 'Jordan Park', userId: '@jordanp', points: 5678, tier: 'Platinum', tasksCompleted: 589, streak: 38, color: 'bg-gradient-to-r from-slate-300 to-slate-500' },
    { rank: 8, name: 'Casey Wong', userId: '@caseyw', points: 4234, tier: 'Gold', tasksCompleted: 456, streak: 31, color: 'bg-gradient-to-r from-yellow-400 to-yellow-600' },
  ];

  const friendsLeaderboard = [
    { rank: 1, name: 'You (Alex)', userId: '@you', points: 3420, tier: 'Gold', tasksCompleted: 342, streak: 28, isCurrentUser: true },
    { rank: 2, name: 'Emma Davis', userId: '@emmad', points: 2890, tier: 'Silver', tasksCompleted: 289, streak: 24 },
    { rank: 3, name: 'Chris Martin', userId: '@chrism', points: 2456, tier: 'Silver', tasksCompleted: 245, streak: 19 },
    { rank: 4, name: 'Sam Rodriguez', userId: '@samr', points: 1823, tier: 'Silver', tasksCompleted: 182, streak: 15 },
    { rank: 5, name: 'Avery Kim', userId: '@averyk', points: 1234, tier: 'Copper', tasksCompleted: 123, streak: 12 },
  ];

  const renderLeaderboardEntry = (entry: any, showBadge = false) => {
    const isTopThree = entry.rank <= 3;
    const medalColors = ['text-yellow-500', 'text-slate-400', 'text-amber-700'];

    return (
      <div
        key={entry.rank}
        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
          entry.isCurrentUser
            ? 'bg-primary/5 border-primary shadow-lg'
            : isTopThree
            ? 'bg-gradient-to-r from-accent/5 to-secondary/5 border-accent/20'
            : 'bg-card border-border hover:border-primary/30'
        }`}
      >
        <div className="flex items-center gap-3 flex-1">
          <div className={`text-2xl ${isTopThree ? medalColors[entry.rank - 1] : 'text-muted-foreground'}`} style={{ fontWeight: 700, minWidth: '2rem' }}>
            {isTopThree ? (entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉') : `#${entry.rank}`}
          </div>
          
          <Avatar className="h-12 w-12">
            <AvatarFallback className={entry.color || 'bg-primary'}>
              {entry.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate" style={{ fontWeight: 600 }}>{entry.name}</span>
              {entry.isCurrentUser && <Badge className="bg-primary">You</Badge>}
            </div>
            <div className="text-sm text-muted-foreground">{entry.userId}</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center hidden sm:block">
            <div className="text-sm text-muted-foreground">Tasks</div>
            <div style={{ fontWeight: 600 }}>{entry.tasksCompleted}</div>
          </div>
          <div className="text-center hidden md:block">
            <div className="text-sm text-muted-foreground">Streak</div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-orange-500" />
              <span style={{ fontWeight: 600 }}>{entry.streak}</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Points</div>
            <div className="text-primary" style={{ fontWeight: 700 }}>{entry.points.toLocaleString()}</div>
          </div>
          {showBadge && (
            <Badge className={entry.color || 'bg-primary'}>{entry.tier}</Badge>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary" style={{ fontWeight: 600 }}>Compete & Achieve</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>Leaderboards</h1>
          <p className="text-xl text-muted-foreground">
            See where you stand among top performers
          </p>
        </div>

        {/* Current User Stats */}
        <Card className="mb-8 border-2 border-primary/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Your Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl">
                <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>3,420</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl">
                <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>#1</div>
                <div className="text-sm text-muted-foreground">Friend Rank</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl">
                <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>342</div>
                <div className="text-sm text-muted-foreground">Tasks Done</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-chart-4/5 to-chart-4/10 rounded-xl">
                <div className="text-3xl mb-1 flex items-center justify-center gap-1">
                  <Zap className="w-6 h-6 text-orange-500" />
                  <span style={{ fontWeight: 700 }}>28</span>
                </div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ fontWeight: 600 }}>Progress to Platinum</span>
                <span className="text-sm text-muted-foreground">3,420 / 5,000 pts</span>
              </div>
              <Progress value={68} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Ranking Tiers */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle>Ranking Tiers</CardTitle>
            <CardDescription>Earn points to climb through the ranks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div key={tier.name} className="p-3 rounded-xl border-2 border-border hover:border-primary/30 transition-all">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center mb-2`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>{tier.name}</div>
                    <div className="text-xs text-muted-foreground">{tier.minPoints.toLocaleString()}+ pts</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboards */}
        <Tabs defaultValue="global" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="global" className="gap-2">
              <Trophy className="w-4 h-4" />
              Global
            </TabsTrigger>
            <TabsTrigger value="friends" className="gap-2">
              <Users className="w-4 h-4" />
              Friends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription>Top performers worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {globalLeaderboard.map((entry) => renderLeaderboardEntry(entry, true))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="friends">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Friends Leaderboard
                </CardTitle>
                <CardDescription>Compete with your friends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {friendsLeaderboard.map((entry) => renderLeaderboardEntry(entry, false))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
