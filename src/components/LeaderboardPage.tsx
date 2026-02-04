import { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, Zap, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { apiCall } from '../utils/supabaseClient';
import { toast } from 'sonner@2.0.3';

export function LeaderboardPage() {
  const [globalLeaderboard, setGlobalLeaderboard] = useState<any[]>([]);
  const [friendsLeaderboard, setFriendsLeaderboard] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profileData, global, friends] = await Promise.all([
        apiCall('/profile'),
        apiCall('/leaderboard/global'),
        apiCall('/leaderboard/friends'),
      ]);

      setProfile(profileData);
      setGlobalLeaderboard(global.map((u: any, index: number) => ({ ...u, rank: index + 1 })));
      setFriendsLeaderboard(friends.map((u: any, index: number) => ({ ...u, rank: index + 1 })));
    } catch (error: any) {
      toast.error(error.message || 'Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const getNextTier = () => {
    if (!profile) return null;
    const currentTierIndex = tiers.findIndex(t => t.name === profile.rank);
    if (currentTierIndex > 0) {
      return tiers[currentTierIndex - 1];
    }
    return null;
  };

  const renderLeaderboardEntry = (entry: any, showBadge = false) => {
    const isTopThree = entry.rank <= 3;
    const isCurrentUser = profile && entry.id === profile.id;
    const medalColors = ['text-yellow-500', 'text-slate-400', 'text-amber-700'];

    const tierColor = tiers.find(t => t.name === entry.rank)?.color || 'from-primary to-secondary';

    return (
      <div
        key={entry.id}
        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
          isCurrentUser
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
            <AvatarFallback className={`bg-gradient-to-br ${tierColor}`}>
              {entry.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate" style={{ fontWeight: 600 }}>{entry.name}</span>
              {isCurrentUser && <Badge className="bg-primary">You</Badge>}
            </div>
            <div className="text-sm text-muted-foreground">@{entry.name.toLowerCase().replace(/\s+/g, '')}</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center hidden md:block">
            <div className="text-sm text-muted-foreground">Streak</div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-orange-500" />
              <span style={{ fontWeight: 600 }}>{entry.streak || 0}</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Points</div>
            <div className="text-primary" style={{ fontWeight: 700 }}>{entry.points.toLocaleString()}</div>
          </div>
          {showBadge && (
            <Badge className={`bg-gradient-to-r ${tierColor}`}>{entry.rank}</Badge>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const nextTier = getNextTier();
  const progress = nextTier ? ((profile.points % nextTier.minPoints) / nextTier.minPoints) * 100 : 100;

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
        {profile && (
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
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{profile.points.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl">
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>
                    #{friendsLeaderboard.findIndex(u => u.id === profile.id) + 1}
                  </div>
                  <div className="text-sm text-muted-foreground">Friend Rank</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl">
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{profile.totalTasksCompleted}</div>
                  <div className="text-sm text-muted-foreground">Tasks Done</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-chart-4/5 to-chart-4/10 rounded-xl">
                  <div className="text-3xl mb-1 flex items-center justify-center gap-1">
                    <Zap className="w-6 h-6 text-orange-500" />
                    <span style={{ fontWeight: 700 }}>{profile.streak}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
              {nextTier && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ fontWeight: 600 }}>Progress to {nextTier.name}</span>
                    <span className="text-sm text-muted-foreground">{profile.points.toLocaleString()} / {nextTier.minPoints.toLocaleString()} pts</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              )}
            </CardContent>
          </Card>
        )}

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
                  {globalLeaderboard.length > 0 ? (
                    globalLeaderboard.map((entry) => renderLeaderboardEntry(entry, true))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No leaderboard data available yet
                    </div>
                  )}
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
                  {friendsLeaderboard.length > 0 ? (
                    friendsLeaderboard.map((entry) => renderLeaderboardEntry(entry, false))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Add friends to see the friends leaderboard
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
