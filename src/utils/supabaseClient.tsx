import { mockDataService } from './mockDataService';
import { toast } from 'sonner@2.0.3';

type AuthListener = (event: string, session: any) => void;
const listeners: AuthListener[] = [];

const notifyListeners = async (event: string) => {
  const { session } = await mockDataService.getSession();
  listeners.forEach(l => l(event, session));
};

// Mock Supabase Client
export const supabase = {
  auth: {
    getSession: async () => {
      const result = await mockDataService.getSession();
      return { data: result };
    },
    onAuthStateChange: (callback: AuthListener) => {
      listeners.push(callback);
      // Immediately invoke with current session
      mockDataService.getSession().then(({ session }) => {
        callback('INITIAL_SESSION', session);
      });
      
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              const index = listeners.indexOf(callback);
              if (index > -1) listeners.splice(index, 1);
            },
          },
        },
      };
    },
    signInWithPassword: async ({ email, password }: any) => {
      const result = await mockDataService.signIn(email, password);
      if (!result.error) {
        notifyListeners('SIGNED_IN');
      }
      return { data: result.user ? { user: result.user, session: {} } : null, error: result.error ? { message: result.error } : null };
    },
    signOut: async () => {
      await mockDataService.signOut();
      notifyListeners('SIGNED_OUT');
      return { error: null };
    },
    signInWithOAuth: async ({ provider }: any) => {
      if (provider === 'google') {
        const result = await mockDataService.signInWithGoogle();
        if (!result.error) {
          notifyListeners('SIGNED_IN');
        }
        return { error: result.error ? { message: result.error } : null };
      }
      return { error: { message: 'Provider not supported' } };
    },
  },
};

// API Call Wrapper
export async function apiCall(endpoint: string, options: RequestInit = {}) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    const method = options.method || 'GET';
    const body = options.body ? JSON.parse(options.body as string) : null;

    // Route matching
    if (endpoint === '/signup' && method === 'POST') {
      const { email, password, name } = body;
      const result = await mockDataService.signUp(email, password, name);
      if (result.error) throw new Error(result.error);
      
      // Auto sign-in notification is handled if the caller subsequently calls signInWithPassword
      // But mockDataService.signUp already sets the session.
      // So we should notify listeners here too if we want immediate update?
      // Actually LoginPage calls signInWithPassword after signup, so that will trigger the notification.
      return result;
    }

    if (endpoint === '/profile') {
      if (method === 'GET') return mockDataService.getProfile();
      if (method === 'PUT') return mockDataService.updateProfile(body);
    }

    if (endpoint === '/tasks') {
      if (method === 'GET') return mockDataService.getUserTasks();
      if (method === 'POST') return mockDataService.createTask(body);
    }

    // Match /tasks/:id
    const taskMatch = endpoint.match(/^\/tasks\/([^/]+)$/);
    if (taskMatch) {
      const taskId = taskMatch[1];
      if (method === 'PUT') return mockDataService.updateTask(taskId, body);
      if (method === 'DELETE') return mockDataService.deleteTask(taskId);
    }

    // Match /tasks/:id/complete
    const taskCompleteMatch = endpoint.match(/^\/tasks\/([^/]+)\/complete$/);
    if (taskCompleteMatch) {
      const taskId = taskCompleteMatch[1];
      if (method === 'POST') return mockDataService.completeTask(taskId);
    }

    if (endpoint === '/leaderboard/global' && method === 'GET') {
      return mockDataService.getGlobalLeaderboard();
    }

    if (endpoint === '/leaderboard/friends' && method === 'GET') {
      return mockDataService.getFriendsLeaderboard();
    }

    if (endpoint === '/rewards' && method === 'GET') {
      return mockDataService.getRewards();
    }

    if (endpoint === '/rewards/purchase' && method === 'POST') {
      return mockDataService.purchaseReward(body.rewardId, body.price);
    }

    if (endpoint === '/analytics' && method === 'GET') {
      return mockDataService.getAnalytics();
    }

    if (endpoint === '/friends/add' && method === 'POST') {
      return mockDataService.addFriend(body.friendEmail);
    }

    if (endpoint === '/friends' && method === 'GET') {
      return mockDataService.getFriends();
    }

    throw new Error(`Endpoint not found: ${endpoint}`);

  } catch (error: any) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Request failed');
  }
}
