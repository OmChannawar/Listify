import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Flame, Target, Award, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { apiCall } from '../utils/supabaseClient';
import { toast } from 'sonner@2.0.3';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export function ProgressTrackerPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [analyticsData, profileData] = await Promise.all([
        apiCall('/analytics'),
        apiCall('/profile'),
      ]);

      setAnalytics(analyticsData);
      setProfile(profileData);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const streakHeatmapData = analytics?.dailyData || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary" style={{ fontWeight: 600 }}>Track Your Growth</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>Progress Tracker</h1>
          <p className="text-xl text-muted-foreground">
            Monitor your performance and build better habits
          </p>
        </div>

        {/* Key Metrics */}
        {profile && analytics && (
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{profile.streak}</div>
                      <div className="text-sm text-muted-foreground">Current Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{profile.longestStreak}</div>
                      <div className="text-sm text-muted-foreground">Longest Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{analytics.completedTasks}</div>
                      <div className="text-sm text-muted-foreground">Completed Tasks</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{Math.round(analytics.onTimeRate)}%</div>
                      <div className="text-sm text-muted-foreground">On-Time Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Completion Rates */}
            <Card className="mb-8 border-2">
              <CardHeader>
                <CardTitle>Completion Statistics</CardTitle>
                <CardDescription>Your overall task completion performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontWeight: 600 }}>Overall Completion Rate</span>
                      <span className="text-sm text-muted-foreground">{Math.round(analytics.completionRate)}%</span>
                    </div>
                    <Progress value={analytics.completionRate} className="h-3" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontWeight: 600 }}>On-Time Completion Rate</span>
                      <span className="text-sm text-muted-foreground">{Math.round(analytics.onTimeRate)}%</span>
                    </div>
                    <Progress value={analytics.onTimeRate} className="h-3 [&>div]:bg-green-500" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 pt-4">
                    <div className="text-center p-4 bg-primary/5 rounded-xl">
                      <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>{analytics.totalTasks}</div>
                      <div className="text-sm text-muted-foreground">Total Tasks</div>
                    </div>
                    <div className="text-center p-4 bg-green-500/5 rounded-xl">
                      <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>{analytics.completedTasks}</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/5 rounded-xl">
                      <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>{profile.tasksCompletedOnTime}</div>
                      <div className="text-sm text-muted-foreground">On Time</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charts */}
            <Tabs defaultValue="daily" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="daily">
                  <Calendar className="w-4 h-4 mr-2" />
                  Daily Activity
                </TabsTrigger>
                <TabsTrigger value="streak">
                  <Flame className="w-4 h-4 mr-2" />
                  Streak View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="daily">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Daily Task Completion (Last 7 Days)</CardTitle>
                    <CardDescription>Track your daily task completion trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={streakHeatmapData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                          }}
                        />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
                          }}
                        />
                        <Legend />
                        <Bar dataKey="completed" fill="hsl(var(--primary))" name="Completed" />
                        <Bar dataKey="onTime" fill="hsl(142 76% 36%)" name="On Time" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="streak">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Streak Heatmap</CardTitle>
                    <CardDescription>Visualize your consistency over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border-2 border-orange-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                            <Flame className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Current Streak</div>
                            <div className="text-2xl" style={{ fontWeight: 700 }}>{profile.streak} days</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Best Streak</div>
                          <div className="text-2xl" style={{ fontWeight: 700 }}>{profile.longestStreak} days</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-2">
                        {streakHeatmapData.map((day: any, index: number) => {
                          const intensity = day.onTime > 2 ? 'high' : day.onTime > 0 ? 'medium' : 'low';
                          const colors = {
                            high: 'bg-green-500',
                            medium: 'bg-green-300',
                            low: 'bg-gray-200',
                          };

                          return (
                            <div key={index} className="text-center">
                              <div className={`w-full aspect-square rounded ${colors[intensity]} mb-1`} />
                              <div className="text-xs text-muted-foreground">
                                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-4 justify-center pt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-gray-200" />
                          <span className="text-sm text-muted-foreground">No tasks</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-green-300" />
                          <span className="text-sm text-muted-foreground">Some tasks</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-green-500" />
                          <span className="text-sm text-muted-foreground">Many tasks</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
