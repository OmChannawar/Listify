import { User, Trophy, Zap, Target, Award, Edit, Settings, Crown, Medal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ProfilePage() {
  const achievements = [
    { 
      id: 1, 
      name: 'First Steps', 
      description: 'Complete your first task', 
      icon: Target, 
      unlocked: true, 
      color: 'from-primary to-primary/80',
      date: 'Unlocked Sep 15, 2025'
    },
    { 
      id: 2, 
      name: 'Week Warrior', 
      description: 'Maintain a 7-day streak', 
      icon: Zap, 
      unlocked: true, 
      color: 'from-orange-500 to-orange-600',
      date: 'Unlocked Sep 22, 2025'
    },
    { 
      id: 3, 
      name: 'Century Club', 
      description: 'Complete 100 tasks', 
      icon: Trophy, 
      unlocked: true, 
      color: 'from-yellow-500 to-yellow-600',
      date: 'Unlocked Sep 28, 2025'
    },
    { 
      id: 4, 
      name: 'Point Master', 
      description: 'Earn 500 points', 
      icon: Award, 
      unlocked: true, 
      color: 'from-secondary to-pink-600',
      date: 'Unlocked Oct 1, 2025'
    },
    { 
      id: 5, 
      name: 'Month Champion', 
      description: 'Maintain a 30-day streak', 
      icon: Crown, 
      unlocked: false, 
      color: 'from-gray-400 to-gray-500',
      progress: 28,
      total: 30
    },
    { 
      id: 6, 
      name: 'Task Titan', 
      description: 'Complete 500 tasks', 
      icon: Medal, 
      unlocked: false, 
      color: 'from-gray-400 to-gray-500',
      progress: 342,
      total: 500
    },
  ];

  const badges = [
    { name: 'Early Bird', emoji: '🌅', unlocked: true },
    { name: 'Night Owl', emoji: '🦉', unlocked: true },
    { name: 'Speed Demon', emoji: '⚡', unlocked: true },
    { name: 'Perfectionist', emoji: '✨', unlocked: true },
    { name: 'Team Player', emoji: '🤝', unlocked: false },
    { name: 'Legendary', emoji: '👑', unlocked: false },
  ];

  const recentActivity = [
    { action: 'Completed 15 tasks', date: 'Today', icon: CheckCircle, color: 'text-green-500' },
    { action: 'Earned 75 points', date: 'Today', icon: Trophy, color: 'text-primary' },
    { action: 'Unlocked Point Master badge', date: 'Yesterday', icon: Award, color: 'text-secondary' },
    { action: 'Reached 28-day streak', date: '2 days ago', icon: Zap, color: 'text-orange-500' },
    { action: 'Joined Team Productivity group', date: '3 days ago', icon: Users, color: 'text-accent' },
  ];

  const stats = [
    { label: 'Total Points', value: '3,420', icon: Trophy, color: 'bg-primary' },
    { label: 'Tasks Completed', value: '342', icon: Target, color: 'bg-secondary' },
    { label: 'Current Streak', value: '28 days', icon: Zap, color: 'bg-orange-500' },
    { label: 'Badges Earned', value: '12', icon: Award, color: 'bg-accent' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-primary/5 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full mb-4">
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary" style={{ fontWeight: 600 }}>Your Profile</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>Profile</h1>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-8 border-2 border-primary/20 shadow-xl">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-3xl text-white">
                  AC
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h2 className="text-3xl" style={{ fontWeight: 700 }}>Alex Chen</h2>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-fit mx-auto md:mx-0">
                    Gold Tier
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">@alexchen • Member since September 2025</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                        <Icon className={`w-5 h-5 mx-auto mb-1 ${stat.color.replace('bg-', 'text-')}`} />
                        <div className="text-xl" style={{ fontWeight: 700 }}>{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Button variant="default" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontWeight: 600 }}>Progress to Platinum Tier</span>
                <span className="text-sm text-muted-foreground">3,420 / 5,000 points</span>
              </div>
              <Progress value={68} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">1,580 points to go!</p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Achievements
                </CardTitle>
                <CardDescription>Milestones and accomplishments you've unlocked</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          achievement.unlocked
                            ? 'bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20'
                            : 'bg-muted/30 border-border opacity-60'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h3 style={{ fontWeight: 600 }}>{achievement.name}</h3>
                              {achievement.unlocked && <Badge className="bg-green-500 ml-2">✓</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                            {achievement.unlocked ? (
                              <p className="text-xs text-muted-foreground">{achievement.date}</p>
                            ) : (
                              <div>
                                <Progress value={(achievement.progress! / achievement.total!) * 100} className="h-2 mb-1" />
                                <p className="text-xs text-muted-foreground">
                                  {achievement.progress} / {achievement.total}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary" />
                  Badge Collection
                </CardTitle>
                <CardDescription>Collect badges by completing special challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {badges.map((badge, i) => (
                    <div
                      key={i}
                      className={`p-6 rounded-xl border-2 text-center transition-all ${
                        badge.unlocked
                          ? 'bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20 hover:shadow-lg'
                          : 'bg-muted/30 border-border opacity-50'
                      }`}
                    >
                      <div className="text-5xl mb-2">{badge.emoji}</div>
                      <div style={{ fontWeight: 600 }}>{badge.name}</div>
                      {badge.unlocked && (
                        <Badge className="bg-green-500 mt-2">Unlocked</Badge>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl text-center">
                  <p className="text-sm">
                    🎯 <span style={{ fontWeight: 600 }}>4 / 6 badges collected</span> - Keep going to unlock them all!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest achievements and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, i) => {
                    const Icon = activity.icon;
                    return (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border">
                        <div className={`p-2 rounded-lg bg-background ${activity.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div style={{ fontWeight: 600 }}>{activity.action}</div>
                          <div className="text-sm text-muted-foreground">{activity.date}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Customization Section */}
        <Card className="mt-8 border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-secondary/5">
          <CardHeader>
            <CardTitle>Profile Customization</CardTitle>
            <CardDescription>Personalize your profile with themes, backgrounds, and avatars</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border-2 border-border hover:border-primary transition-all cursor-pointer">
                <div className="w-full h-24 bg-gradient-to-br from-primary to-secondary rounded-lg mb-3"></div>
                <div style={{ fontWeight: 600 }}>Ocean Theme</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="p-4 rounded-xl border-2 border-border hover:border-primary transition-all cursor-pointer opacity-60">
                <div className="w-full h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg mb-3"></div>
                <div style={{ fontWeight: 600 }}>Forest Theme</div>
                <div className="text-sm text-muted-foreground">200 points</div>
              </div>
              <div className="p-4 rounded-xl border-2 border-border hover:border-primary transition-all cursor-pointer opacity-60">
                <div className="w-full h-24 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg mb-3"></div>
                <div style={{ fontWeight: 600 }}>Sunset Theme</div>
                <div className="text-sm text-muted-foreground">500 points</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Import missing icons
import { CheckCircle, Users } from 'lucide-react';
