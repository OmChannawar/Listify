import { Gift, Crown, Palette, Sparkles, Star, Award, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function RewardStorePage() {
  const badges = [
    { id: 1, name: 'Golden Star', emoji: '⭐', price: 100, owned: true, rarity: 'Common' },
    { id: 2, name: 'Fire Badge', emoji: '🔥', price: 150, owned: true, rarity: 'Common' },
    { id: 3, name: 'Diamond', emoji: '💎', price: 300, owned: false, rarity: 'Rare' },
    { id: 4, name: 'Crown', emoji: '👑', price: 500, owned: false, rarity: 'Epic' },
    { id: 5, name: 'Lightning', emoji: '⚡', price: 200, owned: true, rarity: 'Common' },
    { id: 6, name: 'Trophy', emoji: '🏆', price: 350, owned: false, rarity: 'Rare' },
    { id: 7, name: 'Rocket', emoji: '🚀', price: 400, owned: false, rarity: 'Rare' },
    { id: 8, name: 'Unicorn', emoji: '🦄', price: 1000, owned: false, rarity: 'Legendary' },
  ];

  const themes = [
    { 
      id: 1, 
      name: 'Ocean Breeze', 
      gradient: 'from-blue-400 to-cyan-600', 
      price: 200, 
      owned: true,
      description: 'Cool blues and refreshing cyans'
    },
    { 
      id: 2, 
      name: 'Sunset Glow', 
      gradient: 'from-orange-400 to-pink-600', 
      price: 300, 
      owned: false,
      description: 'Warm oranges and vibrant pinks'
    },
    { 
      id: 3, 
      name: 'Forest Dreams', 
      gradient: 'from-green-400 to-emerald-700', 
      price: 250, 
      owned: false,
      description: 'Natural greens and earth tones'
    },
    { 
      id: 4, 
      name: 'Royal Purple', 
      gradient: 'from-purple-500 to-indigo-700', 
      price: 400, 
      owned: false,
      description: 'Majestic purples and deep indigos'
    },
    { 
      id: 5, 
      name: 'Midnight Sky', 
      gradient: 'from-slate-700 to-slate-900', 
      price: 350, 
      owned: false,
      description: 'Dark and mysterious'
    },
    { 
      id: 6, 
      name: 'Cherry Blossom', 
      gradient: 'from-pink-300 to-rose-500', 
      price: 500, 
      owned: false,
      description: 'Soft pinks and delicate roses'
    },
  ];

  const backgrounds = [
    { 
      id: 1, 
      name: 'Gradient Waves', 
      preview: 'https://images.unsplash.com/photo-1632679090212-612ac1f4d76f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjByZXdhcmRzJTIwdHJvcGh5fGVufDF8fHx8MTc1OTQ5MDkxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 300, 
      owned: true 
    },
    { 
      id: 2, 
      name: 'Abstract Art', 
      preview: 'https://images.unsplash.com/photo-1725923727777-8d5662c500cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmVzcyUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc1OTQ5MDkxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 400, 
      owned: false 
    },
    { 
      id: 3, 
      name: 'Minimalist Lines', 
      preview: 'https://images.unsplash.com/photo-1741478551723-4b7ce95cf395?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJib2FyZCUyMGNvbXBldGl0aW9ufGVufDF8fHx8MTc1OTQyOTE3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 350, 
      owned: false 
    },
    { 
      id: 4, 
      name: 'Cosmic Space', 
      preview: 'https://images.unsplash.com/photo-1622086674545-1346776dfef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHklMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5NDkwOTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 600, 
      owned: false 
    },
  ];

  const avatars = [
    { id: 1, emoji: '🎨', name: 'Artist', price: 250, animated: false, owned: true },
    { id: 2, emoji: '🚀', name: 'Astronaut', price: 300, animated: true, owned: false },
    { id: 3, emoji: '🦸', name: 'Superhero', price: 400, animated: true, owned: false },
    { id: 4, emoji: '🧙', name: 'Wizard', price: 500, animated: true, owned: false },
    { id: 5, emoji: '🤖', name: 'Robot', price: 350, animated: true, owned: false },
    { id: 6, emoji: '🦄', name: 'Unicorn', price: 800, animated: true, owned: false },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-slate-500';
      case 'Rare': return 'bg-blue-500';
      case 'Epic': return 'bg-purple-500';
      case 'Legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-accent/5 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full mb-4">
            <Gift className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary" style={{ fontWeight: 600 }}>Spend Your Points</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>Reward Store</h1>
          <p className="text-xl text-muted-foreground">
            Customize your profile with badges, themes, and more
          </p>
        </div>

        {/* Points Balance */}
        <Card className="mb-8 border-2 border-secondary/20 shadow-xl bg-gradient-to-br from-secondary/10 to-accent/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Your Balance</div>
                  <div className="text-4xl" style={{ fontWeight: 700 }}>3,420 Points</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Lifetime Earned</div>
                <div className="text-2xl" style={{ fontWeight: 600 }}>8,940 Points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store Tabs */}
        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto">
            <TabsTrigger value="badges" className="gap-2">
              <Award className="w-4 h-4" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="themes" className="gap-2">
              <Palette className="w-4 h-4" />
              Themes
            </TabsTrigger>
            <TabsTrigger value="backgrounds" className="gap-2">
              <Star className="w-4 h-4" />
              Backgrounds
            </TabsTrigger>
            <TabsTrigger value="avatars" className="gap-2">
              <Crown className="w-4 h-4" />
              Avatars
            </TabsTrigger>
          </TabsList>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary" />
                  Badge Collection
                </CardTitle>
                <CardDescription>Collect unique badges to display on your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {badges.map((badge) => (
                    <Card key={badge.id} className={`border-2 ${badge.owned ? 'border-green-500/30 bg-green-50/50' : 'border-border hover:border-secondary/30'} transition-all`}>
                      <CardContent className="pt-6 text-center">
                        <div className="text-6xl mb-3">{badge.emoji}</div>
                        <div style={{ fontWeight: 600 }} className="mb-1">{badge.name}</div>
                        <Badge className={`${getRarityColor(badge.rarity)} mb-3 text-xs`}>
                          {badge.rarity}
                        </Badge>
                        {badge.owned ? (
                          <Badge className="bg-green-500 w-full">Owned</Badge>
                        ) : (
                          <Button size="sm" className="w-full gap-1">
                            <Sparkles className="w-3 h-3" />
                            {badge.price} pts
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Themes Tab */}
          <TabsContent value="themes">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-accent" />
                  Color Themes
                </CardTitle>
                <CardDescription>Change your profile's color scheme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <Card key={theme.id} className={`border-2 ${theme.owned ? 'border-green-500/30 bg-green-50/50' : 'border-border hover:border-accent/30'} transition-all`}>
                      <CardContent className="pt-6">
                        <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${theme.gradient} mb-4 shadow-lg`}></div>
                        <div style={{ fontWeight: 600 }} className="mb-1">{theme.name}</div>
                        <p className="text-sm text-muted-foreground mb-3">{theme.description}</p>
                        {theme.owned ? (
                          <div className="flex gap-2">
                            <Badge className="bg-green-500 flex-1 justify-center">Owned</Badge>
                            <Button size="sm" variant="outline" className="flex-1">Apply</Button>
                          </div>
                        ) : (
                          <Button size="sm" className="w-full gap-1">
                            <Sparkles className="w-3 h-3" />
                            {theme.price} pts
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backgrounds Tab */}
          <TabsContent value="backgrounds">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Profile Backgrounds
                </CardTitle>
                <CardDescription>Set stunning backgrounds for your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {backgrounds.map((bg) => (
                    <Card key={bg.id} className={`border-2 ${bg.owned ? 'border-green-500/30 bg-green-50/50' : 'border-border hover:border-primary/30'} transition-all`}>
                      <CardContent className="pt-6">
                        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 shadow-lg">
                          <ImageWithFallback
                            src={bg.preview}
                            alt={bg.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div style={{ fontWeight: 600 }}>{bg.name}</div>
                            <div className="text-sm text-muted-foreground">{bg.price} points</div>
                          </div>
                          {bg.owned ? (
                            <Badge className="bg-green-500">Owned</Badge>
                          ) : (
                            <Button size="sm" className="gap-1">
                              <Sparkles className="w-3 h-3" />
                              Buy
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Avatars Tab */}
          <TabsContent value="avatars">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-chart-5" />
                  Animated Avatars
                </CardTitle>
                <CardDescription>Unlock special animated profile avatars</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {avatars.map((avatar) => (
                    <Card key={avatar.id} className={`border-2 ${avatar.owned ? 'border-green-500/30 bg-green-50/50' : 'border-border hover:border-chart-5/30'} transition-all`}>
                      <CardContent className="pt-6 text-center">
                        <div className="text-7xl mb-3 relative">
                          {avatar.emoji}
                          {avatar.animated && !avatar.owned && (
                            <div className="absolute -top-2 -right-2">
                              <Zap className="w-6 h-6 text-orange-500" />
                            </div>
                          )}
                        </div>
                        <div style={{ fontWeight: 600 }} className="mb-1">{avatar.name}</div>
                        {avatar.animated && (
                          <Badge variant="secondary" className="mb-2 text-xs">Animated</Badge>
                        )}
                        {avatar.owned ? (
                          <Badge className="bg-green-500 w-full">Owned</Badge>
                        ) : (
                          <Button size="sm" className="w-full gap-1">
                            <Sparkles className="w-3 h-3" />
                            {avatar.price} pts
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Special Offers */}
        <Card className="mt-8 border-2 border-chart-5/20 bg-gradient-to-br from-chart-5/10 to-secondary/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-chart-5 to-secondary flex items-center justify-center flex-shrink-0">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl mb-1" style={{ fontWeight: 700 }}>Limited Time Bundle!</h3>
                <p className="text-muted-foreground">Get 3 badges + 1 theme for only 500 points (Save 30%)</p>
              </div>
              <Button size="lg" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Claim Offer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
