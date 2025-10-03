import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  submissionLink?: string;
  completed: boolean;
  createdAt: number;
  completedAt: number | null;
}

export interface User {
  id: string;
  name: string;
  points: number;
  rank: number;
}

export interface LeaderboardUser extends User {
  rank: number;
}

interface MockSupabaseData {
  user: User;
  tasks: Task[];
  leaderboard: LeaderboardUser[];
}

export const useMockSupabase = () => {
  const [data, setData] = useState<MockSupabaseData>({
    user: { id: 'user_12345', name: 'Alex Chen', points: 3420, rank: 1 },
    tasks: [],
    leaderboard: [
      { id: 'user_12345', name: 'Alex Chen', points: 3420, rank: 1 },
      { id: 'user_2', name: 'Emma Davis', points: 2890, rank: 2 },
      { id: 'user_3', name: 'Chris Martin', points: 2456, rank: 3 },
      { id: 'user_4', name: 'Sam Rodriguez', points: 1823, rank: 4 },
      { id: 'user_5', name: 'Avery Kim', points: 1234, rank: 5 },
    ],
  });

  const getTasks = () => {
    const now = Date.now();
    const fourDaysInMs = 4 * 24 * 60 * 60 * 1000;
    const filteredTasks = data.tasks.filter(task => {
      if (task.completed && task.completedAt && now - task.completedAt > fourDaysInMs) {
        return false;
      }
      return true;
    });
    setData(prev => ({ ...prev, tasks: filteredTasks }));
  };

  const addTask = (newTask: Omit<Task, 'id' | 'completed' | 'createdAt' | 'completedAt'>) => {
    const taskWithDefaults: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
      createdAt: Date.now(),
      completedAt: null,
    };
    setData(prev => ({
      ...prev,
      tasks: [...prev.tasks, taskWithDefaults],
    }));
  };

  const completeTask = (taskId: string) => {
    const updatedTasks = data.tasks.map(task =>
      task.id === taskId ? { ...task, completed: true, completedAt: Date.now() } : task
    );

    const pointsToAward = 10;
    const updatedUser = { ...data.user, points: data.user.points + pointsToAward };

    const updatedLeaderboard = data.leaderboard.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ).sort((a, b) => b.points - a.points).map((user, index) => ({ ...user, rank: index + 1 }));

    setData(prev => ({
      ...prev,
      tasks: updatedTasks,
      user: updatedUser,
      leaderboard: updatedLeaderboard,
    }));
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = data.tasks.filter(task => task.id !== taskId);
    setData(prev => ({ ...prev, tasks: updatedTasks }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTasks();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return {
    ...data,
    addTask,
    completeTask,
    deleteTask,
  };
};
