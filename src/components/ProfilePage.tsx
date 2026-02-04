import { useState, useEffect } from 'react';
import { User, Mail, Award, Trophy, Flame, TrendingUp, Calendar, Edit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { apiCall } from '../utils/supabaseClient';
import { toast } from 'sonner@2.0.3';

export function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profileData, rewardsData] = await Promise.all([
        apiCall('/profile'),
        apiCall('/rewards'),
      ]);

      setProfile(profileData);
      setRewards(rewardsData);
      setFormData({
        name: profileData.name,
        email: profileData.email,
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);

    try {
      const updatedProfile = await apiCall('/profile', {
        method: 'PUT',
        body: JSON.stringify(formData),
      });

      setProfile(updatedProfile);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const purchasedItems = rewards.filter(r => profile.purchasedItems?.includes(r.id));

  const tiers = [
    { name: 'Legendary', color: 'from-yellow-400 via-orange-500 to-red-500', minPoints: 10000 },
    { name: 'Ruby', color: 'from-red-500 to-pink-600', minPoints: 7500 },
    { name: 'Platinum', color: 'from-slate-300 to-slate-500', minPoints: 5000 },
    { name: 'Gold', color: 'from-yellow-400 to-yellow-600', minPoints: 3000 },
    { name: 'Silver', color: 'from-slate-300 to-slate-400', minPoints: 1500 },
    { name: 'Copper', color: 'from-orange-600 to-orange-800', minPoints: 750 },
    { name: 'Iron', color: 'from-gray-400 to-gray-600', minPoints: 300 },
    { name: 'Bronze', color: 'from-amber-600 to-amber-800', minPoints: 0 },
  ];

  const currentTier = tiers.find(t => t.name === profile.rank) || tiers[tiers.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary" style={{ fontWeight: 600 }}>Your Account</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>Profile</h1>
          <p className="text-xl text-muted-foreground">
            Manage your account and view your achievements
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="border-2 shadow-xl">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarFallback className={`bg-gradient-to-br ${currentTier.color} text-white`}>
                      {profile.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl mb-2" style={{ fontWeight: 700 }}>{profile.name}</h2>
                  <Badge className={`bg-gradient-to-r ${currentTier.color}`}>
                    {profile.rank}
                  </Badge>
                </div>

                {!editing ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{profile.email || 'No email set'}</span>
                    </div>
                    <Button onClick={() => setEditing(true)} className="w-full gap-2">
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">Save</Button>
                      <Button type="button" variant="outline" onClick={() => {
                        setEditing(false);
                        setFormData({ name: profile.name, email: profile.email });
                      }}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="text-sm">Points</span>
                  </div>
                  <span style={{ fontWeight: 700 }}>{profile.points.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-500/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Streak</span>
                  </div>
                  <span style={{ fontWeight: 700 }}>{profile.streak} days</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-500/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Tasks Done</span>
                  </div>
                  <span style={{ fontWeight: 700 }}>{profile.totalTasksCompleted}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Achievements & Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Statistics */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Performance Statistics
                </CardTitle>
                <CardDescription>Your overall productivity metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl">
                    <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{profile.points.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Points</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl">
                    <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{profile.totalTasksCompleted}</div>
                    <div className="text-sm text-muted-foreground">Tasks Completed</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-500/5 to-orange-500/10 rounded-xl">
                    <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{profile.streak}</div>
                    <div className="text-sm text-muted-foreground">Current Streak</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl">
                    <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{profile.longestStreak}</div>
                    <div className="text-sm text-muted-foreground">Best Streak</div>
                  </div>
                </div>
                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm" style={{ fontWeight: 600 }}>On-Time Completion</span>
                      <span className="text-sm text-muted-foreground">
                        {profile.totalTasksCompleted > 0 
                          ? Math.round((profile.tasksCompletedOnTime / profile.totalTasksCompleted) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="text-2xl" style={{ fontWeight: 700 }}>
                      {profile.tasksCompletedOnTime} / {profile.totalTasksCompleted}
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm" style={{ fontWeight: 600 }}>Account Age</span>
                    </div>
                    <div className="text-2xl" style={{ fontWeight: 700 }}>
                      {Math.floor((Date.now() - profile.createdAt) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchased Items */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Purchased Items ({purchasedItems.length})
                </CardTitle>
                <CardDescription>Items you've unlocked from the rewards store</CardDescription>
              </CardHeader>
              <CardContent>
                {purchasedItems.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {purchasedItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-4 border-2 rounded-xl">
                        <div className="text-3xl">{item.icon}</div>
                        <div className="flex-1">
                          <div style={{ fontWeight: 600 }}>{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.type}</div>
                        </div>
                        <Badge variant="outline">{item.price} pts</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No items purchased yet</p>
                    <p className="text-sm">Visit the Rewards Store to unlock items!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-secondary" />
                  Badges ({profile.badges?.length || 0})
                </CardTitle>
                <CardDescription>Achievements you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                {profile.badges && profile.badges.length > 0 ? (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                    {profile.badges.map((badge: string, index: number) => (
                      <div key={index} className="text-center p-4 border-2 rounded-xl">
                        <div className="text-4xl mb-2">🏆</div>
                        <div className="text-xs">{badge}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No badges earned yet</p>
                    <p className="text-sm">Complete tasks to earn badges!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
