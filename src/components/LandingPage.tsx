import { CheckCircle2, Zap, Calendar, Bell, Sparkles, Trophy, TrendingUp, Users, Gift, Target, Clock, Link2, Repeat, Brain, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const coreFeatures = [
    {
      icon: CheckCircle2,
      title: 'Smart Task Management',
      description: 'Create tasks with titles, descriptions, due dates, and times. Add subtasks, attach links, and set recurring schedules.',
      features: ['Subtasks with checkboxes', 'Link attachments', 'Recurring tasks (daily, weekly, monthly)', 'Deadline notifications'],
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary" style={{ fontWeight: 600 }}>The Future of Productivity</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontWeight: 800 }}>
            Transform Tasks Into
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Achievements</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Listify combines powerful task management with social collaboration, gamification, and analytics. Stay productive, motivated, and connected while earning points, badges, and rewards.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gap-2" onClick={() => onNavigate('progress')}>
              <TrendingUp className="w-5 h-5" />
              View Progress Tracker
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => onNavigate('leaderboard')}>
              <Trophy className="w-5 h-5" />
              See Leaderboard
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1622086674545-1346776dfef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHklMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5NDkwOTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Listify Dashboard"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="container mx-auto px-4 py-20">
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
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl">
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
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1725923727777-8d5662c500cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmVzcyUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc1OTQ5MDkxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
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

        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>+5</div>
              <div className="text-sm opacity-90">Points per completed task</div>
            </div>
            <div>
              <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>+15</div>
              <div className="text-sm opacity-90">Bonus for early completion</div>
            </div>
            <div>
              <div className="text-4xl mb-2" style={{ fontWeight: 700 }}>Custom</div>
              <div className="text-sm opacity-90">Set point values by difficulty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Features */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-accent/5 to-chart-4/5 rounded-3xl">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGZyaWVuZHN8ZW58MXx8fHwxNzU5NDkwOTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
              <Button className="mt-8 gap-2" onClick={() => onNavigate('friends')}>
                <Users className="w-5 h-5" />
                Explore Social Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary via-secondary to-accent p-12 rounded-3xl text-white shadow-2xl">
          <h2 className="text-4xl mb-4" style={{ fontWeight: 700 }}>Ready to Transform Your Productivity?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of users who are achieving more with Listify
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="gap-2" onClick={() => onNavigate('profile')}>
              <User className="w-5 h-5" />
              View Your Profile
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2" onClick={() => onNavigate('rewards')}>
              <Gift className="w-5 h-5" />
              Explore Rewards
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
