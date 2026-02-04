
// Mock Data Service to replace Supabase backend
// This service uses localStorage to persist data

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  points: number;
  rank: string;
  streak: number;
  longestStreak: number;
  lastTaskDate: number | null;
  totalTasksCompleted: number;
  tasksCompletedOnTime: number;
  purchasedItems: string[];
  friends: string[];
  badges: string[];
  createdAt: number;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  deadline: string;
  link: string;
  subtasks: { id: string; text: string; completed: boolean }[];
  completed: boolean;
  completedAt: number | null;
  createdAt: number;
  deadlineLocked: boolean;
}

const DEFAULT_REWARDS = [
  { id: 'badge_champion', name: 'Champion Badge', type: 'badge', price: 100, description: 'Show off your champion status', icon: '🏆' },
  { id: 'badge_star', name: 'Star Performer', type: 'badge', price: 150, description: 'You\'re a star!', icon: '⭐' },
  { id: 'badge_fire', name: 'On Fire', type: 'badge', price: 200, description: 'Your streak is blazing', icon: '🔥' },
  { id: 'theme_dark', name: 'Dark Mode Theme', type: 'theme', price: 250, description: 'Sleek dark interface', icon: '🌙' },
  { id: 'theme_ocean', name: 'Ocean Theme', type: 'theme', price: 300, description: 'Calming blue waves', icon: '🌊' },
  { id: 'theme_sunset', name: 'Sunset Theme', type: 'theme', price: 300, description: 'Warm sunset colors', icon: '🌅' },
  { id: 'bg_gradient', name: 'Gradient Background', type: 'background', price: 400, description: 'Colorful gradient background', icon: '🎨' },
  { id: 'bg_galaxy', name: 'Galaxy Background', type: 'background', price: 500, description: 'Stunning space background', icon: '🌌' },
];

class MockDataService {
  private getUsers(): UserProfile[] {
    const users = localStorage.getItem('listify_users');
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: UserProfile[]) {
    localStorage.setItem('listify_users', JSON.stringify(users));
  }

  private getTasks(): Task[] {
    const tasks = localStorage.getItem('listify_tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  private saveTasks(tasks: Task[]) {
    localStorage.setItem('listify_tasks', JSON.stringify(tasks));
  }

  private getCurrentUserId(): string | null {
    return localStorage.getItem('listify_session_user_id');
  }

  // --- Auth ---

  async signUp(email: string, password: string, name: string): Promise<{ user: { id: string; email: string } | null; error: string | null }> {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) {
      return { user: null, error: 'User already exists' };
    }

    const newUser: UserProfile = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name,
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

    users.push(newUser);
    this.saveUsers(users);
    
    // Auto login
    localStorage.setItem('listify_session_user_id', newUser.id);

    return { user: { id: newUser.id, email: newUser.email }, error: null };
  }

  async signIn(email: string, password: string): Promise<{ user: { id: string; email: string } | null; error: string | null }> {
    // In a real app we would check password, but for mock we just check email existence
    const users = this.getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return { user: null, error: 'Invalid credentials' };
    }

    localStorage.setItem('listify_session_user_id', user.id);
    return { user: { id: user.id, email: user.email }, error: null };
  }

  async signOut() {
    localStorage.removeItem('listify_session_user_id');
  }

  async getSession() {
    const userId = this.getCurrentUserId();
    if (!userId) return { session: null };
    
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        localStorage.removeItem('listify_session_user_id');
        return { session: null };
    }
    
    return {
        session: {
            user: { id: user.id, email: user.email, user_metadata: { name: user.name } },
            access_token: 'mock_token'
        }
    };
  }

  async signInWithGoogle(): Promise<{ user: { id: string; email: string } | null; error: string | null }> {
    const users = this.getUsers();
    // Check if a mock google user exists, or create one
    let user = users.find(u => u.email === 'user@gmail.com');
    
    if (!user) {
      const newUser: UserProfile = {
        id: `user_google_${Date.now()}`,
        email: 'user@gmail.com',
        name: 'Google User',
        points: 50, // Bonus for social login
        rank: 'Bronze',
        streak: 0,
        longestStreak: 0,
        lastTaskDate: null,
        totalTasksCompleted: 0,
        tasksCompletedOnTime: 0,
        purchasedItems: [],
        friends: [],
        badges: ['Social Butterfly'],
        createdAt: Date.now(),
      };
      users.push(newUser);
      this.saveUsers(users);
      user = newUser;
    }

    localStorage.setItem('listify_session_user_id', user.id);
    return { user: { id: user.id, email: user.email }, error: null };
  }

  // --- Profile ---

  async getProfile() {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('Unauthorized');

    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    
    return user;
  }

  async updateProfile(updates: Partial<UserProfile>) {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('Unauthorized');

    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error('User not found');

    const updatedUser = {
      ...users[index],
      ...updates,
      id: userId, // Protect ID
      points: users[index].points, // Protect points
      streak: users[index].streak, // Protect streak
    };

    users[index] = updatedUser;
    this.saveUsers(users);
    return updatedUser;
  }

  // --- Tasks ---

  async getUserTasks() {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('Unauthorized');

    const tasks = this.getTasks();
    return tasks.filter(t => t.userId === userId);
  }

  async createTask(taskData: any) {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('Unauthorized');

    const newTask: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      title: taskData.title,
      description: taskData.description || '',
      deadline: taskData.deadline,
      link: taskData.link || '',
      subtasks: taskData.subtasks || [],
      completed: false,
      completedAt: null,
      createdAt: Date.now(),
      deadlineLocked: !!taskData.deadline,
    };

    const tasks = this.getTasks();
    tasks.push(newTask);
    this.saveTasks(tasks);

    return newTask;
  }

  async updateTask(taskId: string, updates: any) {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('Unauthorized');

    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) throw new Error('Task not found');
    
    const task = tasks[index];
    if (task.userId !== userId) throw new Error('Unauthorized');

    if (task.deadlineLocked && updates.deadline && updates.deadline !== task.deadline) {
      throw new Error('Deadline cannot be changed once set');
    }

    const updatedTask = {
      ...task,
      ...updates,
      id: taskId,
      userId: userId,
      completed: task.completed, // Use completeTask for this
    };

    tasks[index] = updatedTask;
    this.saveTasks(tasks);
    return updatedTask;
  }

  async deleteTask(taskId: string) {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('Unauthorized');

    let tasks = this.getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) throw new Error('Task not found');
    if (task.userId !== userId) throw new Error('Unauthorized');

    tasks = tasks.filter(t => t.id !== taskId);
    this.saveTasks(tasks);
    return { success: true };
  }

  async completeTask(taskId: string) {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('Unauthorized');

    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) throw new Error('Task not found');

    const task = tasks[index];
    if (task.userId !== userId) throw new Error('Unauthorized');
    if (task.completed) throw new Error('Task already completed');

    const completedAt = Date.now();
    const isOnTime = task.deadline ? completedAt <= new Date(task.deadline).getTime() : true;
    const points = 5 + (isOnTime ? 15 : 0);

    // Update task
    tasks[index] = { ...task, completed: true, completedAt };
    this.saveTasks(tasks);

    // Update User Profile
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    const user = users[userIndex];

    const newPoints = user.points + points;
    const newRank = this.calculateRank(newPoints);
    
    // Calculate Streak
    const streakData = this.calculateStreak(user, isOnTime);
    
    const updatedUser = {
      ...user,
      points: newPoints,
      rank: newRank,
      totalTasksCompleted: user.totalTasksCompleted + 1,
      tasksCompletedOnTime: user.tasksCompletedOnTime + (isOnTime ? 1 : 0),
      streak: streakData.streak,
      longestStreak: streakData.longestStreak,
      lastTaskDate: streakData.lastTaskDate,
    };

    users[userIndex] = updatedUser;
    this.saveUsers(users);

    return {
      task: tasks[index],
      pointsEarned: points,
      profile: updatedUser,
      streak: streakData,
    };
  }

  // --- Helpers ---

  private calculateRank(points: number): string {
    if (points >= 10000) return 'Legendary';
    if (points >= 7500) return 'Ruby';
    if (points >= 5000) return 'Platinum';
    if (points >= 3000) return 'Gold';
    if (points >= 1500) return 'Silver';
    if (points >= 750) return 'Copper';
    if (points >= 250) return 'Iron';
    return 'Bronze';
  }

  private calculateStreak(user: UserProfile, completedOnTime: boolean) {
    const today = new Date().setHours(0, 0, 0, 0);
    const lastDate = user.lastTaskDate ? new Date(user.lastTaskDate).setHours(0, 0, 0, 0) : null;
    
    let newStreak = user.streak;
    
    if (!lastDate) {
      newStreak = completedOnTime ? 1 : 0;
    } else if (today === lastDate) {
      newStreak = user.streak;
    } else if (today - lastDate === 86400000) { // 1 day difference in ms
      newStreak = completedOnTime ? user.streak + 1 : 0;
    } else {
      newStreak = completedOnTime ? 1 : 0;
    }
    
    const longestStreak = Math.max(user.longestStreak, newStreak);
    
    return {
      streak: newStreak,
      longestStreak,
      lastTaskDate: today,
    };
  }

  // --- Leaderboard ---

  async getGlobalLeaderboard() {
    const users = this.getUsers();
    return users
      .map(u => ({
        id: u.id,
        name: u.name,
        points: u.points,
        rank: u.rank,
        streak: u.streak,
      }))
      .sort((a, b) => b.points - a.points);
  }

  async getFriendsLeaderboard() {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('Unauthorized');

    const users = this.getUsers();
    const currentUser = users.find(u => u.id === userId);
    if (!currentUser) throw new Error('User not found');

    const friendIds = currentUser.friends || [];
    const friendProfiles = users.filter(u => u.id === userId || friendIds.includes(u.id));

    return friendProfiles
      .map(u => ({
        id: u.id,
        name: u.name,
        points: u.points,
        rank: u.rank,
        streak: u.streak,
      }))
      .sort((a, b) => b.points - a.points);
  }

  // --- Friends ---

  async addFriend(friendEmail: string) {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('Unauthorized');

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    const friend = users.find(u => u.email === friendEmail);

    if (!friend) throw new Error('User not found');
    if (friend.id === userId) throw new Error('Cannot add yourself');
    
    const user = users[userIndex];
    if (user.friends.includes(friend.id)) throw new Error('Already friends');

    user.friends = [...user.friends, friend.id];
    users[userIndex] = user;
    this.saveUsers(users);

    return user;
  }

  async getFriends() {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('Unauthorized');

    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    const friendIds = user.friends || [];
    const friends = users.filter(u => friendIds.includes(u.id));

    return friends.map(f => ({
      id: f.id,
      name: f.name,
      points: f.points,
      rank: f.rank,
      streak: f.streak,
    }));
  }

  // --- Rewards ---

  async getRewards() {
    return DEFAULT_REWARDS;
  }

  async purchaseReward(rewardId: string, price: number) {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('Unauthorized');

    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    const user = users[index];

    if (user.points < price) throw new Error('Not enough points');
    if (user.purchasedItems.includes(rewardId)) throw new Error('Already purchased');

    const updatedUser = {
      ...user,
      points: user.points - price,
      purchasedItems: [...user.purchasedItems, rewardId],
    };

    users[index] = updatedUser;
    this.saveUsers(users);

    return updatedUser;
  }

  // --- Analytics ---

  async getAnalytics() {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('Unauthorized');

    const user = await this.getProfile();
    const tasks = await this.getUserTasks();
    const completedTasks = tasks.filter(t => t.completed);
    
    const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
    const onTimeRate = user.totalTasksCompleted > 0 
      ? (user.tasksCompletedOnTime / user.totalTasksCompleted) * 100 
      : 0;

    const dailyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayTasks = completedTasks.filter(t => {
        if (!t.completedAt) return false;
        const taskDate = new Date(t.completedAt).toISOString().split('T')[0];
        return taskDate === dateStr;
      });
      
      dailyData.push({
        date: dateStr,
        completed: dayTasks.length,
        onTime: dayTasks.filter(t => t.completedAt && t.deadline && t.completedAt <= new Date(t.deadline).getTime()).length,
      });
    }

    return {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      completionRate,
      onTimeRate,
      streak: user.streak,
      longestStreak: user.longestStreak,
      dailyData,
    };
  }
}

export const mockDataService = new MockDataService();
