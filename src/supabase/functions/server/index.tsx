import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper to get authenticated user
async function getAuthenticatedUser(authHeader: string | null) {
  if (!authHeader) return null;
  
  const token = authHeader.split(' ')[1];
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
  
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  
  return user;
}

// Helper to get or create user profile
async function getUserProfile(userId: string) {
  const profile = await kv.get(`user:${userId}`);
  
  if (!profile) {
    const newProfile = {
      id: userId,
      name: 'New User',
      email: '',
      points: 0,
      rank: 'Bronze',
      streak: 0,
      longestStreak: 0,
      lastTaskDate: null,
      totalTasksCompleted: 0,
      tasksCompletedOnTime: 0,
      purchasedItems: [],
      friends: [],
      badges: [],
      createdAt: Date.now(),
    };
    await kv.set(`user:${userId}`, newProfile);
    return newProfile;
  }
  
  return profile;
}

// Helper to calculate rank from points
function calculateRank(points: number): string {
  if (points >= 10000) return 'Legendary';
  if (points >= 7500) return 'Ruby';
  if (points >= 5000) return 'Platinum';
  if (points >= 3000) return 'Gold';
  if (points >= 1500) return 'Silver';
  if (points >= 750) return 'Copper';
  if (points >= 250) return 'Iron';
  return 'Bronze';
}

// Helper to update streak
async function updateStreak(userId: string, completedOnTime: boolean) {
  const profile = await getUserProfile(userId);
  const today = new Date().setHours(0, 0, 0, 0);
  const lastDate = profile.lastTaskDate ? new Date(profile.lastTaskDate).setHours(0, 0, 0, 0) : null;
  
  let newStreak = profile.streak;
  
  if (!lastDate) {
    newStreak = completedOnTime ? 1 : 0;
  } else if (today === lastDate) {
    // Same day, keep streak
    newStreak = profile.streak;
  } else if (today - lastDate === 86400000) {
    // Next day
    newStreak = completedOnTime ? profile.streak + 1 : 0;
  } else {
    // Streak broken
    newStreak = completedOnTime ? 1 : 0;
  }
  
  const longestStreak = Math.max(profile.longestStreak, newStreak);
  
  await kv.set(`user:${userId}`, {
    ...profile,
    streak: newStreak,
    longestStreak,
    lastTaskDate: today,
  });
  
  return { streak: newStreak, longestStreak };
}

// Health check endpoint
app.get("/make-server-86e7a7bb/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-86e7a7bb/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }
    
    // Create user profile
    await getUserProfile(data.user.id);
    
    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// Get user profile
app.get("/make-server-86e7a7bb/profile", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  const profile = await getUserProfile(user.id);
  return c.json(profile);
});

// Update user profile
app.put("/make-server-86e7a7bb/profile", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  try {
    const updates = await c.req.json();
    const profile = await getUserProfile(user.id);
    
    const updatedProfile = {
      ...profile,
      ...updates,
      id: user.id, // Ensure ID cannot be changed
      points: profile.points, // Protect points
      streak: profile.streak, // Protect streak
    };
    
    await kv.set(`user:${user.id}`, updatedProfile);
    return c.json(updatedProfile);
  } catch (error) {
    console.log('Profile update error:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// Get tasks
app.get("/make-server-86e7a7bb/tasks", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  const tasksKey = `tasks:${user.id}`;
  const tasks = await kv.get(tasksKey) || [];
  
  return c.json(tasks);
});

// Create task
app.post("/make-server-86e7a7bb/tasks", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  try {
    const taskData = await c.req.json();
    const tasksKey = `tasks:${user.id}`;
    const tasks = await kv.get(tasksKey) || [];
    
    const newTask = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      title: taskData.title,
      description: taskData.description || '',
      deadline: taskData.deadline,
      link: taskData.link || '',
      subtasks: taskData.subtasks || [],
      completed: false,
      completedAt: null,
      createdAt: Date.now(),
      deadlineLocked: !!taskData.deadline, // Lock deadline once set
    };
    
    tasks.push(newTask);
    await kv.set(tasksKey, tasks);
    
    return c.json(newTask);
  } catch (error) {
    console.log('Task creation error:', error);
    return c.json({ error: 'Failed to create task' }, 500);
  }
});

// Update task
app.put("/make-server-86e7a7bb/tasks/:id", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  try {
    const taskId = c.req.param('id');
    const updates = await c.req.json();
    const tasksKey = `tasks:${user.id}`;
    const tasks = await kv.get(tasksKey) || [];
    
    const taskIndex = tasks.findIndex((t: any) => t.id === taskId);
    if (taskIndex === -1) {
      return c.json({ error: 'Task not found' }, 404);
    }
    
    const task = tasks[taskIndex];
    
    // Prevent deadline modification if locked
    if (task.deadlineLocked && updates.deadline && updates.deadline !== task.deadline) {
      return c.json({ error: 'Deadline cannot be changed once set' }, 400);
    }
    
    tasks[taskIndex] = {
      ...task,
      ...updates,
      id: task.id, // Ensure ID cannot be changed
      userId: task.userId, // Ensure userId cannot be changed
      completed: task.completed, // Use complete endpoint for this
    };
    
    await kv.set(tasksKey, tasks);
    return c.json(tasks[taskIndex]);
  } catch (error) {
    console.log('Task update error:', error);
    return c.json({ error: 'Failed to update task' }, 500);
  }
});

// Complete task
app.post("/make-server-86e7a7bb/tasks/:id/complete", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  try {
    const taskId = c.req.param('id');
    const tasksKey = `tasks:${user.id}`;
    const tasks = await kv.get(tasksKey) || [];
    
    const taskIndex = tasks.findIndex((t: any) => t.id === taskId);
    if (taskIndex === -1) {
      return c.json({ error: 'Task not found' }, 404);
    }
    
    const task = tasks[taskIndex];
    if (task.completed) {
      return c.json({ error: 'Task already completed' }, 400);
    }
    
    const completedAt = Date.now();
    const isOnTime = task.deadline ? completedAt <= new Date(task.deadline).getTime() : true;
    
    // Calculate points: 5 for completion + 15 bonus if on time
    const points = 5 + (isOnTime ? 15 : 0);
    
    // Update task
    tasks[taskIndex] = {
      ...task,
      completed: true,
      completedAt,
    };
    await kv.set(tasksKey, tasks);
    
    // Update user profile
    const profile = await getUserProfile(user.id);
    const newPoints = profile.points + points;
    const newRank = calculateRank(newPoints);
    
    const updatedProfile = {
      ...profile,
      points: newPoints,
      rank: newRank,
      totalTasksCompleted: profile.totalTasksCompleted + 1,
      tasksCompletedOnTime: profile.tasksCompletedOnTime + (isOnTime ? 1 : 0),
    };
    
    await kv.set(`user:${user.id}`, updatedProfile);
    
    // Update streak
    const streakData = await updateStreak(user.id, isOnTime);
    
    return c.json({
      task: tasks[taskIndex],
      pointsEarned: points,
      profile: updatedProfile,
      streak: streakData,
    });
  } catch (error) {
    console.log('Task completion error:', error);
    return c.json({ error: 'Failed to complete task' }, 500);
  }
});

// Delete task
app.delete("/make-server-86e7a7bb/tasks/:id", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  try {
    const taskId = c.req.param('id');
    const tasksKey = `tasks:${user.id}`;
    const tasks = await kv.get(tasksKey) || [];
    
    const filteredTasks = tasks.filter((t: any) => t.id !== taskId);
    await kv.set(tasksKey, filteredTasks);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Task deletion error:', error);
    return c.json({ error: 'Failed to delete task' }, 500);
  }
});

// Get global leaderboard
app.get("/make-server-86e7a7bb/leaderboard/global", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  try {
    // Get all user profiles
    const allUsers = await kv.getByPrefix('user:');
    
    // Sort by points
    const sortedUsers = allUsers
      .map((u: any) => ({
        id: u.id,
        name: u.name,
        points: u.points,
        rank: u.rank,
        streak: u.streak,
      }))
      .sort((a: any, b: any) => b.points - a.points);
    
    return c.json(sortedUsers);
  } catch (error) {
    console.log('Leaderboard error:', error);
    return c.json({ error: 'Failed to get leaderboard' }, 500);
  }
});

// Get friends leaderboard
app.get("/make-server-86e7a7bb/leaderboard/friends", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  try {
    const profile = await getUserProfile(user.id);
    const friendIds = profile.friends || [];
    
    // Get profiles for friends and current user
    const friendProfiles = await Promise.all(
      [user.id, ...friendIds].map(id => getUserProfile(id))
    );
    
    const sortedFriends = friendProfiles
      .map((u: any) => ({
        id: u.id,
        name: u.name,
        points: u.points,
        rank: u.rank,
        streak: u.streak,
      }))
      .sort((a: any, b: any) => b.points - a.points);
    
    return c.json(sortedFriends);
  } catch (error) {
    console.log('Friends leaderboard error:', error);
    return c.json({ error: 'Failed to get friends leaderboard' }, 500);
  }
});

// Get rewards
app.get("/make-server-86e7a7bb/rewards", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  const rewards = [
    { id: 'badge_champion', name: 'Champion Badge', type: 'badge', price: 100, description: 'Show off your champion status', icon: '🏆' },
    { id: 'badge_star', name: 'Star Performer', type: 'badge', price: 150, description: 'You\'re a star!', icon: '⭐' },
    { id: 'badge_fire', name: 'On Fire', type: 'badge', price: 200, description: 'Your streak is blazing', icon: '🔥' },
    { id: 'theme_dark', name: 'Dark Mode Theme', type: 'theme', price: 250, description: 'Sleek dark interface', icon: '🌙' },
    { id: 'theme_ocean', name: 'Ocean Theme', type: 'theme', price: 300, description: 'Calming blue waves', icon: '🌊' },
    { id: 'theme_sunset', name: 'Sunset Theme', type: 'theme', price: 300, description: 'Warm sunset colors', icon: '🌅' },
    { id: 'bg_gradient', name: 'Gradient Background', type: 'background', price: 400, description: 'Colorful gradient background', icon: '🎨' },
    { id: 'bg_galaxy', name: 'Galaxy Background', type: 'background', price: 500, description: 'Stunning space background', icon: '🌌' },
  ];
  
  return c.json(rewards);
});

// Purchase reward
app.post("/make-server-86e7a7bb/rewards/purchase", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  try {
    const { rewardId, price } = await c.req.json();
    const profile = await getUserProfile(user.id);
    
    if (profile.points < price) {
      return c.json({ error: 'Not enough points' }, 400);
    }
    
    if (profile.purchasedItems?.includes(rewardId)) {
      return c.json({ error: 'Already purchased' }, 400);
    }
    
    const updatedProfile = {
      ...profile,
      points: profile.points - price,
      purchasedItems: [...(profile.purchasedItems || []), rewardId],
    };
    
    await kv.set(`user:${user.id}`, updatedProfile);
    
    return c.json(updatedProfile);
  } catch (error) {
    console.log('Purchase error:', error);
    return c.json({ error: 'Failed to purchase reward' }, 500);
  }
});

// Get analytics
app.get("/make-server-86e7a7bb/analytics", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  try {
    const profile = await getUserProfile(user.id);
    const tasksKey = `tasks:${user.id}`;
    const tasks = await kv.get(tasksKey) || [];
    
    // Calculate completion rate
    const completedTasks = tasks.filter((t: any) => t.completed);
    const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
    
    // Calculate on-time rate
    const onTimeRate = profile.totalTasksCompleted > 0 
      ? (profile.tasksCompletedOnTime / profile.totalTasksCompleted) * 100 
      : 0;
    
    // Generate historical data for charts (last 7 days)
    const dailyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayTasks = completedTasks.filter((t: any) => {
        const taskDate = new Date(t.completedAt).toISOString().split('T')[0];
        return taskDate === dateStr;
      });
      
      dailyData.push({
        date: dateStr,
        completed: dayTasks.length,
        onTime: dayTasks.filter((t: any) => t.completedAt <= new Date(t.deadline).getTime()).length,
      });
    }
    
    return c.json({
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      completionRate,
      onTimeRate,
      streak: profile.streak,
      longestStreak: profile.longestStreak,
      dailyData,
    });
  } catch (error) {
    console.log('Analytics error:', error);
    return c.json({ error: 'Failed to get analytics' }, 500);
  }
});

// Add friend
app.post("/make-server-86e7a7bb/friends/add", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  try {
    const { friendEmail } = await c.req.json();
    
    // Find friend by email
    const allUsers = await kv.getByPrefix('user:');
    const friend = allUsers.find((u: any) => u.email === friendEmail);
    
    if (!friend) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    if (friend.id === user.id) {
      return c.json({ error: 'Cannot add yourself as friend' }, 400);
    }
    
    const profile = await getUserProfile(user.id);
    
    if (profile.friends?.includes(friend.id)) {
      return c.json({ error: 'Already friends' }, 400);
    }
    
    const updatedProfile = {
      ...profile,
      friends: [...(profile.friends || []), friend.id],
    };
    
    await kv.set(`user:${user.id}`, updatedProfile);
    
    return c.json(updatedProfile);
  } catch (error) {
    console.log('Add friend error:', error);
    return c.json({ error: 'Failed to add friend' }, 500);
  }
});

// Get friends
app.get("/make-server-86e7a7bb/friends", async (c) => {
  const user = await getAuthenticatedUser(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  
  try {
    const profile = await getUserProfile(user.id);
    const friendIds = profile.friends || [];
    
    const friendProfiles = await Promise.all(
      friendIds.map(id => getUserProfile(id))
    );
    
    return c.json(friendProfiles.map((f: any) => ({
      id: f.id,
      name: f.name,
      points: f.points,
      rank: f.rank,
      streak: f.streak,
    })));
  } catch (error) {
    console.log('Get friends error:', error);
    return c.json({ error: 'Failed to get friends' }, 500);
  }
});

Deno.serve(app.fetch);