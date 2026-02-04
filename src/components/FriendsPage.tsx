import { useState, useEffect } from 'react';
import { Users, UserPlus, Trophy, Zap, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { apiCall } from '../utils/supabaseClient';
import { toast } from 'sonner@2.0.3';

export function FriendsPage() {
  const [friends, setFriends] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [friendsData, profileData] = await Promise.all([
        apiCall('/friends'),
        apiCall('/profile'),
      ]);

      setFriends(friendsData);
      setProfile(profileData);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load friends');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);

    try {
      await apiCall('/friends/add', {
        method: 'POST',
        body: JSON.stringify({ friendEmail }),
      });

      toast.success('Friend added successfully!');
      setFriendEmail('');
      loadData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add friend');
    } finally {
      setAdding(false);
    }
  };

  const tiers = [
    { name: 'Legendary', color: 'from-yellow-400 via-orange-500 to-red-500' },
    { name: 'Ruby', color: 'from-red-500 to-pink-600' },
    { name: 'Platinum', color: 'from-slate-300 to-slate-500' },
    { name: 'Gold', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Silver', color: 'from-slate-300 to-slate-400' },
    { name: 'Copper', color: 'from-orange-600 to-orange-800' },
    { name: 'Iron', color: 'from-gray-400 to-gray-600' },
    { name: 'Bronze', color: 'from-amber-600 to-amber-800' },
  ];

  const getTierColor = (rank: string) => {
    return tiers.find(t => t.name === rank)?.color || 'from-primary to-secondary';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary" style={{ fontWeight: 600 }}>Social Features</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>Friends</h1>
          <p className="text-xl text-muted-foreground">
            Connect with friends and compete on the leaderboard
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Friend Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 shadow-xl sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-primary" />
                  Add Friend
                </CardTitle>
                <CardDescription>Send a friend request by email</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddFriend} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="friendEmail">Friend's Email</Label>
                    <Input
                      id="friendEmail"
                      type="email"
                      placeholder="friend@example.com"
                      value={friendEmail}
                      onChange={(e) => setFriendEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={adding} className="w-full gap-2">
                    <UserPlus className="w-4 h-4" />
                    {adding ? 'Adding...' : 'Add Friend'}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-primary/5 rounded-xl">
                  <h4 className="mb-2" style={{ fontWeight: 600 }}>Benefits</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Compete on friends leaderboard</li>
                    <li>• See their progress and stats</li>
                    <li>• Motivate each other to complete tasks</li>
                    <li>• Join group challenges (coming soon)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Friends List */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Your Friends ({friends.length})
                </CardTitle>
                <CardDescription>Friends you're connected with</CardDescription>
              </CardHeader>
              <CardContent>
                {friends.length > 0 ? (
                  <div className="space-y-4">
                    {friends.map((friend, index) => (
                      <div
                        key={friend.id}
                        className="flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-all"
                      >
                        <Avatar className="h-14 w-14">
                          <AvatarFallback className={`bg-gradient-to-br ${getTierColor(friend.rank)}`}>
                            {friend.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="truncate" style={{ fontWeight: 600 }}>{friend.name}</span>
                            <Badge className={`bg-gradient-to-r ${getTierColor(friend.rank)}`}>
                              {friend.rank}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Trophy className="w-3 h-3" />
                              {friend.points.toLocaleString()} pts
                            </div>
                            <div className="flex items-center gap-1">
                              <Zap className="w-3 h-3 text-orange-500" />
                              {friend.streak} day streak
                            </div>
                          </div>
                        </div>

                        <div className="hidden sm:block text-right">
                          <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>#{index + 1}</div>
                          <div className="text-xs text-muted-foreground">Friend Rank</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Users className="w-20 h-20 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-xl mb-2" style={{ fontWeight: 600 }}>No friends added yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Add friends to compete on the friends leaderboard
                    </p>
                    <div className="inline-flex items-center gap-2 p-4 bg-muted rounded-xl">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">Enter a friend's email to get started</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Features Coming Soon */}
            <Card className="border-2 mt-8">
              <CardHeader>
                <CardTitle>🚀 Coming Soon</CardTitle>
                <CardDescription>Exciting social features on the way</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl">
                    <h4 className="mb-2" style={{ fontWeight: 600 }}>Group Challenges</h4>
                    <p className="text-sm text-muted-foreground">
                      Create and join group challenges with friends
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl">
                    <h4 className="mb-2" style={{ fontWeight: 600 }}>Collaborative Tasks</h4>
                    <p className="text-sm text-muted-foreground">
                      Work together on shared tasks and projects
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl">
                    <h4 className="mb-2" style={{ fontWeight: 600 }}>Direct Messages</h4>
                    <p className="text-sm text-muted-foreground">
                      Chat with friends about tasks and goals
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-chart-4/5 to-chart-4/10 rounded-xl">
                    <h4 className="mb-2" style={{ fontWeight: 600 }}>Team Leaderboards</h4>
                    <p className="text-sm text-muted-foreground">
                      Compete as teams in special events
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
