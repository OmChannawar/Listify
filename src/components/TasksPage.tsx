import { useState, useEffect } from 'react';
import { Calendar, Clock, Link as LinkIcon, Trash2, CheckCircle2, Plus, AlertCircle, ListChecks, Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { NotificationGuide } from './NotificationGuide';
import { apiCall } from '../utils/supabaseClient';
import { toast } from 'sonner@2.0.3';

const generateGoogleCalendarUrl = (task: any) => {
  const formatDateTime = (date: string) => {
    return date ? new Date(date).toISOString().replace(/-|:|\\./g, '') : '';
  };

  const title = encodeURIComponent(task.title);
  const details = encodeURIComponent(
    `Task: ${task.title}\\n` +
    `Details: ${task.description}\\n` +
    `Submission Link: ${task.link || 'None'}`
  );
  const dates = `${formatDateTime(task.deadline)}/${formatDateTime(new Date(new Date(task.deadline).getTime() + 60 * 60 * 1000))}`;
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dates}`;
};

export function TasksPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalData, setModalData] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    link: '',
    subtasks: [] as string[],
  });
  const [subtaskInput, setSubtaskInput] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tasksData, profileData] = await Promise.all([
        apiCall('/tasks'),
        apiCall('/profile'),
      ]);
      setTasks(tasksData);
      setProfile(profileData);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const addSubtask = () => {
    if (subtaskInput.trim()) {
      setNewTask(prev => ({
        ...prev,
        subtasks: [...prev.subtasks, subtaskInput.trim()],
      }));
      setSubtaskInput('');
    }
  };

  const removeSubtask = (index: number) => {
    setNewTask(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index),
    }));
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.deadline) {
      toast.error('Task title and deadline are required!');
      return;
    }

    try {
      const taskData = {
        ...newTask,
        subtasks: newTask.subtasks.map((text, index) => ({
          id: `subtask_${Date.now()}_${index}`,
          text,
          completed: false,
        })),
      };
      
      const createdTask = await apiCall('/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
      });

      setTasks(prev => [...prev, createdTask]);
      setNewTask({ title: '', description: '', deadline: '', link: '', subtasks: [] });
      toast.success('Task created! Add it to your Google Calendar to get notifications.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create task');
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      const response = await apiCall(`/tasks/${taskId}/complete`, {
        method: 'POST',
      });

      setTasks(prev => prev.map(t => t.id === taskId ? response.task : t));
      setProfile(response.profile);
      
      const pointsMessage = `+${response.pointsEarned} points earned!`;
      const streakMessage = response.streak.streak > 0 ? ` 🔥 ${response.streak.streak} day streak!` : '';
      
      setModalMessage(pointsMessage + streakMessage);
      setModalData(response);
      setShowModal(true);
    } catch (error: any) {
      toast.error(error.message || 'Failed to complete task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await apiCall(`/tasks/${taskId}`, {
        method: 'DELETE',
      });

      setTasks(prev => prev.filter(t => t.id !== taskId));
      toast.success('Task deleted');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete task');
    }
  };

  const toggleSubtask = async (taskId: string, subtaskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedSubtasks = task.subtasks.map((st: any) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );

    try {
      const updatedTask = await apiCall(`/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({ subtasks: updatedSubtasks }),
      });

      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    } catch (error: any) {
      toast.error(error.message || 'Failed to update subtask');
    }
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary" style={{ fontWeight: 600 }}>Task Management</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>My Tasks</h1>
          <p className="text-xl text-muted-foreground">
            Complete tasks on time to earn bonus points and build your streak
          </p>
        </div>

        {/* User Stats */}
        {profile && (
          <Card className="mb-8 border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Welcome back,</div>
                    <div className="text-2xl" style={{ fontWeight: 700 }}>{profile.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{profile.points}</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{profile.rank}</div>
                    <div className="text-sm text-muted-foreground">Rank</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{profile.streak}</div>
                    <div className="text-sm text-muted-foreground">Streak</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add New Task */}
        <Card className="mb-8 border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add a New Task
            </CardTitle>
            <CardDescription>
              Earn 5 points for completion + 15 bonus points if completed before deadline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">
                    Deadline * 
                    <span className="text-xs text-muted-foreground ml-1">(cannot be changed later)</span>
                  </Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="datetime-local"
                    value={newTask.deadline}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Task Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  placeholder="Describe your task (optional)"
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  name="link"
                  type="url"
                  value={newTask.link}
                  onChange={handleInputChange}
                  placeholder="https://example.com (optional)"
                />
              </div>
              
              {/* Subtasks */}
              <div className="space-y-2">
                <Label>Subtasks</Label>
                <div className="flex gap-2">
                  <Input
                    value={subtaskInput}
                    onChange={(e) => setSubtaskInput(e.target.value)}
                    placeholder="Add a subtask"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
                  />
                  <Button type="button" onClick={addSubtask} variant="outline">
                    Add
                  </Button>
                </div>
                {newTask.subtasks.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {newTask.subtasks.map((subtask, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <ListChecks className="w-4 h-4 text-muted-foreground" />
                        <span className="flex-1">{subtask}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSubtask(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add Task
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Active Tasks */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>Active Tasks</h2>
          {activeTasks.length === 0 ? (
            <Card className="border-2">
              <CardContent className="pt-6 text-center py-12">
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-lg text-muted-foreground">No active tasks. Add one to get started!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeTasks.map(task => (
                <Card
                  key={task.id}
                  className={`border-2 transition-all ${
                    isOverdue(task.deadline)
                      ? 'border-destructive/50 bg-destructive/5'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl mb-2" style={{ fontWeight: 600 }}>{task.title}</h3>
                        {task.description && (
                          <p className="text-muted-foreground mb-3">{task.description}</p>
                        )}
                        
                        {/* Subtasks */}
                        {task.subtasks && task.subtasks.length > 0 && (
                          <div className="mb-3 space-y-2">
                            {task.subtasks.map((subtask: any) => (
                              <div key={subtask.id} className="flex items-center gap-2">
                                <Checkbox
                                  checked={subtask.completed}
                                  onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
                                />
                                <span className={subtask.completed ? 'line-through text-muted-foreground' : ''}>
                                  {subtask.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(task.deadline).toLocaleString()}</span>
                          </div>
                          {isOverdue(task.deadline) ? (
                            <Badge className="bg-destructive">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Overdue
                            </Badge>
                          ) : (
                            <Badge className="bg-green-500">
                              +20 points if completed on time
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {task.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="gap-2"
                        >
                          <a
                            href={task.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LinkIcon className="w-4 h-4" />
                            Link
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="gap-2"
                      >
                        <a
                          href={generateGoogleCalendarUrl(task)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Calendar className="w-4 h-4" />
                          Add to Calendar
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="gap-2 bg-green-500 hover:bg-green-600"
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-2"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tasks & Notification Guide Tabs */}
        {completedTasks.length > 0 || true ? (
          <Tabs defaultValue="completed" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="completed">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Completed ({completedTasks.length})
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="completed">
              {completedTasks.length > 0 ? (
                <div className="space-y-4">
                  {completedTasks.map(task => (
                    <Card key={task.id} className="border-2 border-green-500/30 bg-green-50/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-xl mb-2 line-through text-muted-foreground" style={{ fontWeight: 600 }}>
                              {task.title}
                            </h3>
                            {task.description && (
                              <p className="text-muted-foreground mb-3 line-through">{task.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Completed {task.completedAt ? new Date(task.completedAt).toLocaleString() : ''}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-2">
                  <CardContent className="pt-6 text-center py-12">
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-lg text-muted-foreground">No completed tasks yet</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationGuide />
            </TabsContent>
          </Tabs>
        ) : null}
      </div>

      {/* Success Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🎉 Task Completed!</DialogTitle>
            <DialogDescription>
              Great job! Here are your rewards for completing this task.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            <p className="text-lg">{modalMessage}</p>
            {modalData && (
              <div className="space-y-1">
                <p>Total Points: {modalData.profile.points}</p>
                <p>Current Rank: {modalData.profile.rank}</p>
                {modalData.streak.streak > 0 && (
                  <p className="text-orange-500">🔥 {modalData.streak.streak} day streak!</p>
                )}
              </div>
            )}
          </div>
          <Button onClick={() => setShowModal(false)} className="w-full">
            Awesome!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
