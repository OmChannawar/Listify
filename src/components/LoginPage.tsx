import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CheckCircle2, Zap, Trophy, Users, Target, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  const features = [
    { icon: CheckCircle2, text: 'Smart task management with AI assistance', color: 'text-primary' },
    { icon: Trophy, text: 'Earn points, badges, and climb leaderboards', color: 'text-secondary' },
    { icon: Users, text: 'Compete and collaborate with friends', color: 'text-accent' },
    { icon: Target, text: 'Track streaks and build productive habits', color: 'text-chart-4' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl" style={{ fontWeight: 700 }}>Listify</h1>
          </div>
          <p className="text-xl text-muted-foreground text-center max-w-2xl">
            Transform your productivity with gamification. Complete tasks, earn rewards, and compete with friends.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Side - Features */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary" style={{ fontWeight: 600 }}>Gamified Productivity</span>
              </div>
              <h2 className="text-3xl mb-4" style={{ fontWeight: 700 }}>Stay Productive, Stay Motivated</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Listify combines powerful task management with social features, gamification, and analytics to help you achieve more.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-border">
                    <div className={`p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 ${feature.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="pt-2">{feature.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl" style={{ fontWeight: 700 }}>10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center">
                <div className="text-3xl" style={{ fontWeight: 700 }}>1M+</div>
                <div className="text-sm text-muted-foreground">Tasks Completed</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center">
                <div className="text-3xl" style={{ fontWeight: 700 }}>4.9★</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login/Signup Form */}
          <Card className="shadow-2xl border-2">
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Create an account or sign in to start your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email or User ID</Label>
                      <Input 
                        id="login-email" 
                        type="text" 
                        placeholder="Enter your email or user ID" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input 
                        id="login-password" 
                        type="password" 
                        placeholder="Enter your password" 
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
                    <Button type="button" variant="outline" className="w-full" onClick={onLogin}>
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
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-userid">User ID</Label>
                      <Input 
                        id="signup-userid" 
                        type="text" 
                        placeholder="Choose a unique user ID" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="Enter your email" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        placeholder="Create a strong password" 
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
                    <Button type="button" variant="outline" className="w-full" onClick={onLogin}>
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
      </div>
    </div>
  );
}
