import { useState, useEffect } from 'react';
import { ShoppingBag, Award, Palette, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { apiCall } from '../utils/supabaseClient';
import { toast } from 'sonner@2.0.3';

export function RewardStorePage() {
  const [rewards, setRewards] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [rewardsData, profileData] = await Promise.all([
        apiCall('/rewards'),
        apiCall('/profile'),
      ]);

      setRewards(rewardsData);
      setProfile(profileData);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load rewards');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (reward: any) => {
    if (profile.points < reward.price) {
      toast.error('Not enough points!');
      return;
    }

    if (profile.purchasedItems?.includes(reward.id)) {
      toast.error('Already purchased!');
      return;
    }

    setPurchasing(reward.id);

    try {
      const updatedProfile = await apiCall('/rewards/purchase', {
        method: 'POST',
        body: JSON.stringify({
          rewardId: reward.id,
          price: reward.price,
        }),
      });

      setProfile(updatedProfile);
      toast.success(`${reward.name} purchased! 🎉`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to purchase item');
    } finally {
      setPurchasing(null);
    }
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'badge':
        return Award;
      case 'theme':
        return Palette;
      case 'background':
        return ImageIcon;
      default:
        return Sparkles;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const badges = rewards.filter(r => r.type === 'badge');
  const themes = rewards.filter(r => r.type === 'theme');
  const backgrounds = rewards.filter(r => r.type === 'background');

  const renderRewardCard = (reward: any) => {
    const Icon = getCategoryIcon(reward.type);
    const isPurchased = profile.purchasedItems?.includes(reward.id);
    const canAfford = profile.points >= reward.price;

    return (
      <Card key={reward.id} className={`border-2 transition-all ${isPurchased ? 'border-green-500/50 bg-green-50/50' : 'border-border hover:border-primary/30'}`}>
        <CardContent className="pt-6">
          <div className="text-center mb-4">
            <div className="text-6xl mb-3">{reward.icon}</div>
            <h3 className="text-lg mb-2" style={{ fontWeight: 600 }}>{reward.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
            <Badge variant="outline" className="mb-3">
              <Icon className="w-3 h-3 mr-1" />
              {reward.type}
            </Badge>
          </div>

          <div className="text-center mb-4">
            <div className="text-3xl mb-1" style={{ fontWeight: 700, color: canAfford ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}>
              {reward.price} pts
            </div>
            {!canAfford && !isPurchased && (
              <div className="text-sm text-destructive">
                Need {reward.price - profile.points} more points
              </div>
            )}
          </div>

          {isPurchased ? (
            <Button disabled className="w-full gap-2" variant="outline">
              <Check className="w-4 h-4" />
              Purchased
            </Button>
          ) : (
            <Button
              onClick={() => handlePurchase(reward)}
              disabled={!canAfford || purchasing === reward.id}
              className="w-full gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              {purchasing === reward.id ? 'Purchasing...' : 'Purchase'}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary" style={{ fontWeight: 600 }}>Earn & Unlock</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>Rewards Store</h1>
          <p className="text-xl text-muted-foreground">
            Spend your hard-earned points on exclusive items
          </p>
        </div>

        {/* Points Balance */}
        {profile && (
          <Card className="mb-8 border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Available Balance</div>
                    <div className="text-3xl" style={{ fontWeight: 700 }}>{profile.points.toLocaleString()} Points</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>{profile.purchasedItems?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">Items Owned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1" style={{ fontWeight: 700 }}>{rewards.length - (profile.purchasedItems?.length || 0)}</div>
                    <div className="text-sm text-muted-foreground">Available</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Store Info */}
        <Card className="mb-8 border-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2" style={{ fontWeight: 600 }}>How to Earn Points</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Complete any task: <span className="text-primary" style={{ fontWeight: 600 }}>+5 points</span></li>
                  <li>• Complete a task before deadline: <span className="text-green-600" style={{ fontWeight: 600 }}>+15 bonus points</span> (20 total)</li>
                  <li>• Build streaks and climb the leaderboard to earn more!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="badges">
              <Award className="w-4 h-4 mr-2" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="themes">
              <Palette className="w-4 h-4 mr-2" />
              Themes
            </TabsTrigger>
            <TabsTrigger value="backgrounds">
              <ImageIcon className="w-4 h-4 mr-2" />
              Backgrounds
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {rewards.map(renderRewardCard)}
            </div>
          </TabsContent>

          <TabsContent value="badges">
            <Card className="border-2 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Badges
                </CardTitle>
                <CardDescription>Show off your achievements with exclusive badges</CardDescription>
              </CardHeader>
            </Card>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {badges.length > 0 ? badges.map(renderRewardCard) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No badges available
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="themes">
            <Card className="border-2 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Themes
                </CardTitle>
                <CardDescription>Customize your interface with beautiful themes</CardDescription>
              </CardHeader>
            </Card>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {themes.length > 0 ? themes.map(renderRewardCard) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No themes available
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="backgrounds">
            <Card className="border-2 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Backgrounds
                </CardTitle>
                <CardDescription>Personalize your profile with stunning backgrounds</CardDescription>
              </CardHeader>
            </Card>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {backgrounds.length > 0 ? backgrounds.map(renderRewardCard) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No backgrounds available
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
