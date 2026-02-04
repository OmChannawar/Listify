import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CheckCircle2, Trophy, Users, Target, Sparkles, Brain, TrendingUp, Gift, Bell, Calendar, Repeat, Link2 } from 'lucide-react';
import { supabase, apiCall } from '../utils/supabaseClient';
import { toast } from 'sonner@2.0.3';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      if (error) throw error;
      
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await apiCall('/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: signupEmail,
          password: signupPassword,
          name: signupName,
        }),
      });
      
      if (response.error) throw new Error(response.error);
      
      // Auto sign in after signup
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: signupEmail,
        password: signupPassword,
      });
      
      if (signInError) throw signInError;
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      
      if (error) throw error;
      toast.success('Signed in with Google!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const coreFeatures = [
    {
      icon: CheckCircle2,
      title: 'Smart Task Management',
      description: 'Create tasks with titles, descriptions, due dates, and times. Add subtasks, attach links, and set recurring schedules.',
      features: ['Subtasks with checkboxes', 'Link attachments', 'Recurring tasks', 'Deadline notifications'],
      color: 'from-primary to-primary/80',
    },
    {
      icon: Brain,
      title: 'AI-Powered Assistance',
      description: 'Let AI help you break down complex tasks into actionable steps automatically.',
      features: ['Smart task suggestions', 'Auto-generate subtasks', 'Context-aware recommendations', 'Time estimation'],
      color: 'from-accent to-accent/80',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Visualize your productivity with streaks, heatmaps, and comprehensive analytics.',
      features: ['Consecutive day streaks', 'Calendar heatmap view', 'Weekly analytics dashboard', 'Google Calendar sync'],
      color: 'from-chart-4 to-chart-4/80',
    },
    {
      icon: Trophy,
      title: 'Gamification & Rewards',
      description: 'Earn points for completing tasks and climb the leaderboards to showcase your productivity.',
      features: ['+5 points per task', '+15 bonus for early completion', 'Custom point values', 'Ranking tiers system'],
      color: 'from-secondary to-secondary/80',
    },
  ];

  const gamificationFeatures = [
    {
      icon: Trophy,
      title: 'Leaderboards',
      description: 'Compete globally or with friends across ranking tiers',
      tiers: ['Bronze', 'Iron', 'Copper', 'Silver', 'Gold', 'Platinum', 'Ruby', 'Legendary'],
    },
    {
      icon: Gift,
      title: 'Reward Store',
      description: 'Spend points on badges, themes, backgrounds, and animated avatars',
      items: ['Custom badges', 'Profile themes', 'Animated avatars', 'Special backgrounds'],
    },
    {
      icon: Target,
      title: 'Challenges',
      description: 'Complete daily challenges and group goals for bonus rewards',
      types: ['Daily special tasks', 'Group challenges', 'Shared collaborative tasks', 'Weekly milestones'],
    },
  ];

  const socialFeatures = [
    { icon: Users, text: 'Create groups and track collective progress' },
    { icon: Trophy, text: 'Compete on private friend leaderboards' },
    { icon: CheckCircle2, text: 'Share tasks and progress with friends' },
    { icon: Target, text: 'Collaborative projects with shared rewards' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Hero Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary" style={{ fontWeight: 600 }}>The Future of Productivity</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl" style={{ fontWeight: 800 }}>
              Transform Tasks Into
              <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Achievements</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Listify combines powerful task management with social collaboration, gamification, and analytics. Stay productive, motivated, and connected.
            </p>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2">
                <div className="text-2xl" style={{ fontWeight: 700 }}>10K+</div>
                <div className="text-sm text-muted-foreground text-left">Active<br/>Users</div>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="flex items-center gap-2">
                <div className="text-2xl" style={{ fontWeight: 700 }}>1M+</div>
                <div className="text-sm text-muted-foreground text-left">Tasks<br/>Completed</div>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="flex items-center gap-2">
                <div className="text-2xl" style={{ fontWeight: 700 }}>4.9★</div>
                <div className="text-sm text-muted-foreground text-left">User<br/>Rating</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login/Signup Form */}
          <Card className="shadow-2xl border-2 border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Create an account or sign in to start your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input 
                        id="login-email" 
                        type="email" 
                        placeholder="Enter your email" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input 
                        id="login-password" 
                        type="password" 
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>
                    <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin}>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google Account
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Name</Label>
                      <Input 
                        id="signup-name" 
                        type="text" 
                        placeholder="Enter your name"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="Enter your email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        placeholder="Create a strong password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>
                    <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin}>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Features */}
      <section className="container mx-auto px-4 py-20 bg-white/50 backdrop-blur-sm">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4" style={{ fontWeight: 700 }}>Powerful Features</h2>
          <p className="text-xl text-muted-foreground">Everything you need to boost your productivity</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {coreFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Task Management Details */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6" style={{ fontWeight: 700 }}>Comprehensive Task Management</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Create and organize tasks with all the details you need. From simple to-dos to complex projects, Listify has you covered.
              </p>
              <div className="space-y-4">
                {[
                  { icon: CheckCircle2, text: 'Title, description, due date & time' },
                  { icon: Target, text: 'Subtasks with checkboxes for step-by-step completion' },
                  { icon: Link2, text: 'Attach relevant links to tasks' },
                  { icon: Repeat, text: 'Set recurring tasks (daily, weekly, monthly, custom)' },
                  { icon: Bell, text: 'Smart reminders and deadline notifications' },
                  { icon: Calendar, text: 'Google Calendar integration for seamless syncing' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1665379524469-f2eee88ba00d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjB0YXNrJTIwbWFuYWdlbWVudCUyMGNoZWNrbGlzdCUyMGludGVyZmFjZSUyMDNkJTIwaWNvbnxlbnwxfHx8fDE3Njg5MjA1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Task Management"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4" style={{ fontWeight: 700 }}>Level Up Your Productivity</h2>
          <p className="text-xl text-muted-foreground">Earn points, unlock rewards, and compete with friends</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {gamificationFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(feature.tiers || feature.items || feature.types).map((item, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-secondary/20 h-64 md:h-96">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1730472529229-c139155a7cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pZmljYXRpb24lMjB0cm9waHklMjByZXdhcmRzJTIwM2QlMjBpY29uJTIwcHVycGxlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njg5MjA1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Gamification"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                         <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                            <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>+5</div>
                            <div className="text-sm opacity-90">Points per task</div>
                            </div>
                            <div>
                            <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>+15</div>
                            <div className="text-sm opacity-90">Early bonus</div>
                            </div>
                            <div>
                            <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>Tiers</div>
                            <div className="text-sm opacity-90">Bronze to Legendary</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Social Features */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-accent/5 to-chart-4/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="https://images.unsplash.com/flagged/photo-1564445476463-7833c341e914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwd29ya2luZyUyMHRvZ2V0aGVyJTIwY29sbGFib3JhdGl2ZSUyMHNvZnR3YXJlJTIwc3RhcnR1cCUyMGRpdmVyc2UlMjB0ZWFtfGVufDF8fHx8MTc2ODkyMDU3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Friends & Social"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl mb-6" style={{ fontWeight: 700 }}>Connect & Collaborate</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Productivity is better with friends. Create groups, share tasks, and achieve goals together.
              </p>
              <div className="space-y-4">
                {socialFeatures.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <span>{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer / CTA */}
      <section className="container mx-auto px-4 py-12">
          <div className="text-center text-muted-foreground text-sm">
            <p>&copy; 2026 Listify. All rights reserved.</p>
          </div>
      </section>
    </div>
  );
}
