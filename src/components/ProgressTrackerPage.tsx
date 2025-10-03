import { TrendingUp, Zap, Calendar, BarChart3, Clock, CheckCircle2, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export function ProgressTrackerPage() {
  // Mock data for charts
  const weeklyPointsData = [
    { day: 'Mon', points: 45, tasks: 9 },
    { day: 'Tue', points: 65, tasks: 13 },
    { day: 'Wed', points: 55, tasks: 11 },
    { day: 'Thu', points: 80, tasks: 16 },
    { day: 'Fri', points: 70, tasks: 14 },
    { day: 'Sat', points: 35, tasks: 7 },
    { day: 'Sun', points: 50, tasks: 10 },
  ];

  const completionRateData = [
    { week: 'Week 1', rate: 75 },
    { week: 'Week 2', rate: 82 },
    { week: 'Week 3', rate: 88 },
    { week: 'Week 4', rate: 91 },
  ];

  const productiveTimeData = [
    { time: '6-9am', tasks: 5 },
    { time: '9-12pm', tasks: 12 },
    { time: '12-3pm', tasks: 8 },
    { time: '3-6pm', tasks: 15 },
    { time: '6-9pm', tasks: 10 },
    { time: '9-12am', tasks: 3 },
  ];

  // Heatmap data (simulated)
  const months = ['Oct', 'Nov', 'Dec', 'Jan'];
  const weeks = Array.from({ length: 16 }, (_, i) => i);
  
  const generateHeatmapData = () => {
    const data = [];
    for (let week = 0; week < 16; week++) {
      for (let day = 0; day < 7; day++) {
        const intensity = Math.floor(Math.random() * 5); // 0-4 intensity levels
        data.push({ week, day, intensity });
      }
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  const getHeatmapColor = (intensity: number) => {
    const colors = ['bg-muted', 'bg-primary/20', 'bg-primary/40', 'bg-primary/60', 'bg-primary/80', 'bg-primary'];
    return colors[intensity];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chart-4/5 via-background to-primary/5 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-chart-4/10 to-primary/10 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary" style={{ fontWeight: 600 }}>Track Your Growth</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>Progress Tracker</h1>
          <p className="text-xl text-muted-foreground">
            Visualize your productivity and build lasting habits
          </p>
        </div>

        {/* Streak Card */}
        <Card className="mb-8 border-2 border-primary/20 shadow-xl bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-500" />
              Current Streak
            </CardTitle>
            <CardDescription>Keep the momentum going!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-6xl mb-2" style={{ fontWeight: 800 }}>
                  <span className="text-orange-500">28</span>
                  <span className="text-2xl text-muted-foreground ml-2">days</span>
                </div>
                <p className="text-muted-foreground">Consecutive days of task completion</p>
              </div>
              <div className="text-right space-y-2">
                <Badge className="bg-orange-500">🔥 On Fire!</Badge>
                <div className="text-sm text-muted-foreground">
                  Personal best: 32 days
                </div>
                <div className="text-sm text-muted-foreground">
                  4 days to beat your record!
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 text-primary" />
                <Badge variant="secondary">This Week</Badge>
              </div>
              <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>80</div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="w-8 h-8 text-secondary" />
                <Badge variant="secondary">Weekly</Badge>
              </div>
              <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>400</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="w-8 h-8 text-accent" />
                <Badge variant="secondary">Average</Badge>
              </div>
              <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>91%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-chart-4" />
                <Badge variant="secondary">Peak</Badge>
              </div>
              <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>3-6pm</div>
              <div className="text-sm text-muted-foreground">Most Productive</div>
            </CardContent>
          </Card>
        </div>

        {/* Heatmap */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Activity Heatmap
            </CardTitle>
            <CardDescription>Your task completion history over the past 4 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="flex gap-1 mb-2">
                  <div className="w-12"></div>
                  {months.map((month, i) => (
                    <div key={i} className="text-xs text-muted-foreground" style={{ width: '64px' }}>
                      {month}
                    </div>
                  ))}
                </div>
                <div className="flex gap-1">
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground pr-2">
                    <div className="h-3">Mon</div>
                    <div className="h-3"></div>
                    <div className="h-3">Wed</div>
                    <div className="h-3"></div>
                    <div className="h-3">Fri</div>
                    <div className="h-3"></div>
                    <div className="h-3">Sun</div>
                  </div>
                  {weeks.map((week) => (
                    <div key={week} className="flex flex-col gap-1">
                      {Array.from({ length: 7 }).map((_, day) => {
                        const data = heatmapData.find(d => d.week === week && d.day === day);
                        return (
                          <div
                            key={day}
                            className={`w-3 h-3 rounded-sm ${getHeatmapColor(data?.intensity || 0)} border border-background`}
                            title={`Week ${week + 1}, Day ${day + 1}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-3 h-3 rounded-sm ${getHeatmapColor(i)} border border-background`} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Weekly Points Earned</CardTitle>
              <CardDescription>Points collected each day this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyPointsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Bar dataKey="points" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>400 points</div>
                <div className="text-sm text-muted-foreground">Total this week (+20% from last week)</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Completion Rate Trend</CardTitle>
              <CardDescription>Task completion percentage over the last month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={completionRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" stroke="#64748b" />
                  <YAxis stroke="#64748b" domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#ec4899" 
                    strokeWidth={3}
                    dot={{ fill: '#ec4899', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>91%</div>
                <div className="text-sm text-muted-foreground">Current week (+16% improvement)</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Productive Times */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-chart-4" />
              Most Productive Times
            </CardTitle>
            <CardDescription>When you complete the most tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={productiveTimeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="time" type="category" stroke="#64748b" width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="tasks" fill="#06b6d4" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 p-4 bg-muted/50 rounded-xl">
              <p className="text-sm">
                💡 <span style={{ fontWeight: 600 }}>Insight:</span> You're most productive between 3-6pm. 
                Consider scheduling your most important tasks during this time window.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Google Calendar Integration */}
        <Card className="mt-8 border-2 border-chart-4/20 bg-gradient-to-br from-chart-4/5 to-chart-4/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-chart-4" />
                </div>
                <div>
                  <h3 className="text-lg" style={{ fontWeight: 600 }}>Google Calendar Integration</h3>
                  <p className="text-sm text-muted-foreground">Sync your tasks with Google Calendar</p>
                </div>
              </div>
              <Badge className="bg-green-500">Connected</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
