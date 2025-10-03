import { Users, UserPlus, Trophy, Target, Zap, CheckCircle2, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function FriendsPage() {
  const friends = [
    { 
      id: 1, 
      name: 'Emma Davis', 
      userId: '@emmad', 
      points: 2890, 
      streak: 24, 
      tasksThisWeek: 56,
      tier: 'Silver',
      status: 'online',
      initials: 'ED',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600'
    },
    { 
      id: 2, 
      name: 'Chris Martin', 
      userId: '@chrism', 
      points: 2456, 
      streak: 19, 
      tasksThisWeek: 48,
      tier: 'Silver',
      status: 'online',
      initials: 'CM',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    { 
      id: 3, 
      name: 'Sam Rodriguez', 
      userId: '@samr', 
      points: 1823, 
      streak: 15, 
      tasksThisWeek: 35,
      tier: 'Silver',
      status: 'offline',
      initials: 'SR',
      color: 'bg-gradient-to-br from-purple-500 to-pink-600'
    },
    { 
      id: 4, 
      name: 'Avery Kim', 
      userId: '@averyk', 
      points: 1234, 
      streak: 12, 
      tasksThisWeek: 28,
      tier: 'Copper',
      status: 'offline',
      initials: 'AK',
      color: 'bg-gradient-to-br from-orange-500 to-red-600'
    },
  ];

  const groups = [
    {
      id: 1,
      name: 'Team Productivity',
      members: 8,
      totalPoints: 24560,
      weeklyGoal: 500,
      currentProgress: 387,
      avatar: '💼',
      color: 'from-primary to-primary/80'
    },
    {
      id: 2,
      name: 'Fitness Warriors',
      members: 12,
      totalPoints: 18940,
      weeklyGoal: 400,
      currentProgress: 289,
      avatar: '💪',
      color: 'from-secondary to-pink-600'
    },
    {
      id: 3,
      name: 'Study Buddies',
      members: 6,
      totalPoints: 15230,
      weeklyGoal: 300,
      currentProgress: 245,
      avatar: '📚',
      color: 'from-accent to-purple-700'
    },
  ];

  const challenges = [
    {
      id: 1,
      title: 'Weekend Warrior',
      description: 'Complete 20 tasks this weekend',
      participants: 24,
      reward: 150,
      progress: 12,
      total: 20,
      timeLeft: '2 days',
      icon: Target,
      color: 'text-primary'
    },
    {
      id: 2,
      title: 'Speed Runner',
      description: 'Complete 10 tasks in one day',
      participants: 18,
      reward: 100,
      progress: 7,
      total: 10,
      timeLeft: '18 hours',
      icon: Zap,
      color: 'text-orange-500'
    },
    {
      id: 3,
      title: 'Team Champion',
      description: 'Group completes 100 tasks together',
      participants: 8,
      reward: 200,
      progress: 67,
      total: 100,
      timeLeft: '5 days',
      icon: Trophy,
      color: 'text-secondary'
    },
  ];

  const sharedTasks = [
    {
      id: 1,
      title: 'Plan team meeting agenda',
      assignedBy: 'Emma Davis',
      collaborators: 3,
      deadline: 'Tomorrow',
      completed: false
    },
    {
      id: 2,
      title: 'Research vacation destinations',
      assignedBy: 'Chris Martin',
      collaborators: 2,
      deadline: 'Oct 10',
      completed: false
    },
    {
      id: 3,
      title: 'Organize study materials',
      assignedBy: 'You',
      collaborators: 4,
      deadline: 'Oct 8',
      completed: true
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-chart-4/5 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-chart-4/10 rounded-full mb-4">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent" style={{ fontWeight: 600 }}>Connect & Compete</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>Friends & Social</h1>
          <p className="text-xl text-muted-foreground">
            Collaborate, compete, and achieve together
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-8 rounded-2xl overflow-hidden border-4 border-accent/20 shadow-2xl max-w-4xl mx-auto">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGZyaWVuZHN8ZW58MXx8fHwxNzU5NDkwOTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Friends and Collaboration"
            className="w-full h-auto"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="friends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto">
            <TabsTrigger value="friends" className="gap-2">
              <Users className="w-4 h-4" />
              Friends
            </TabsTrigger>
            <TabsTrigger value="groups" className="gap-2">
              <Trophy className="w-4 h-4" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="challenges" className="gap-2">
              <Target className="w-4 h-4" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="shared" className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Shared Tasks
            </TabsTrigger>
          </TabsList>

          {/* Friends Tab */}
          <TabsContent value="friends">
            <div className="grid gap-6">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-accent" />
                        Your Friends
                      </CardTitle>
                      <CardDescription>Connect and compete with your friends</CardDescription>
                    </div>
                    <Button className="gap-2">
                      <UserPlus className="w-4 h-4" />
                      Add Friend
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {friends.map((friend) => (
                      <Card key={friend.id} className="border-2 hover:border-accent/30 transition-all">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <Avatar className="h-16 w-16">
                                <AvatarFallback className={friend.color}>
                                  {friend.initials}
                                </AvatarFallback>
                              </Avatar>
                              {friend.status === 'online' && (
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span style={{ fontWeight: 600 }}>{friend.name}</span>
                                <Badge variant="secondary" className="text-xs">{friend.tier}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mb-3">{friend.userId}</div>
                              
                              <div className="grid grid-cols-3 gap-3 text-center">
                                <div className="p-2 bg-muted/50 rounded-lg">
                                  <div className="text-lg" style={{ fontWeight: 700 }}>{friend.points}</div>
                                  <div className="text-xs text-muted-foreground">Points</div>
                                </div>
                                <div className="p-2 bg-muted/50 rounded-lg">
                                  <div className="text-lg flex items-center justify-center gap-1">
                                    <Zap className="w-4 h-4 text-orange-500" />
                                    <span style={{ fontWeight: 700 }}>{friend.streak}</span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">Streak</div>
                                </div>
                                <div className="p-2 bg-muted/50 rounded-lg">
                                  <div className="text-lg" style={{ fontWeight: 700 }}>{friend.tasksThisWeek}</div>
                                  <div className="text-xs text-muted-foreground">Tasks</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      Your Groups
                    </CardTitle>
                    <CardDescription>Track collective progress and compete together</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Create Group
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {groups.map((group) => (
                    <Card key={group.id} className="border-2 hover:border-primary/30 transition-all">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center text-3xl`}>
                            {group.avatar}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl mb-1" style={{ fontWeight: 700 }}>{group.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {group.members} members
                              </span>
                              <span className="flex items-center gap-1">
                                <Trophy className="w-4 h-4" />
                                {group.totalPoints.toLocaleString()} points
                              </span>
                            </div>
                          </div>
                          <Button variant="outline">View</Button>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm" style={{ fontWeight: 600 }}>Weekly Group Goal</span>
                            <span className="text-sm text-muted-foreground">
                              {group.currentProgress} / {group.weeklyGoal} tasks
                            </span>
                          </div>
                          <Progress value={(group.currentProgress / group.weeklyGoal) * 100} className="h-3" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-secondary" />
                  Active Challenges
                </CardTitle>
                <CardDescription>Complete challenges for bonus rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {challenges.map((challenge) => {
                    const Icon = challenge.icon;
                    return (
                      <Card key={challenge.id} className="border-2 hover:border-secondary/30 transition-all">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${challenge.color}`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 style={{ fontWeight: 600 }} className="mb-1">{challenge.title}</h3>
                                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                                </div>
                                <Badge className="bg-secondary whitespace-nowrap ml-2">
                                  +{challenge.reward} pts
                                </Badge>
                              </div>
                              
                              <div className="mb-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm">Your Progress</span>
                                  <span className="text-sm text-muted-foreground">
                                    {challenge.progress} / {challenge.total}
                                  </span>
                                </div>
                                <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                              </div>
                              
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {challenge.participants} participating
                                </span>
                                <span>⏱️ {challenge.timeLeft} left</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl text-center">
                  <Crown className="w-12 h-12 mx-auto mb-3 text-secondary" />
                  <h3 className="text-lg mb-2" style={{ fontWeight: 600 }}>Daily Challenge Available!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete today's special challenge for bonus rewards
                  </p>
                  <Button className="gap-2">
                    <Target className="w-4 h-4" />
                    View Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shared Tasks Tab */}
          <TabsContent value="shared">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-chart-4" />
                  Shared Tasks
                </CardTitle>
                <CardDescription>Collaborative tasks assigned by you or your friends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sharedTasks.map((task) => (
                    <Card key={task.id} className={`border-2 ${task.completed ? 'bg-green-50/50 border-green-500/30' : 'border-border hover:border-chart-4/30'} transition-all`}>
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-4">
                          <div className={`mt-1 ${task.completed ? 'text-green-500' : 'text-muted-foreground'}`}>
                            <CheckCircle2 className={`w-6 h-6 ${task.completed ? 'fill-green-500' : ''}`} />
                          </div>
                          <div className="flex-1">
                            <h3 style={{ fontWeight: 600 }} className={`mb-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {task.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Assigned by {task.assignedBy}</span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {task.collaborators} collaborators
                              </span>
                              <span>Due: {task.deadline}</span>
                            </div>
                          </div>
                          {!task.completed && (
                            <Button size="sm" variant="outline">Mark Done</Button>
                          )}
                          {task.completed && (
                            <Badge className="bg-green-500">Completed</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
