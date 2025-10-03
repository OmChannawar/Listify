import { useState } from 'react';
import { Calendar, Clock, Link as LinkIcon, Trash2, CheckCircle2, Plus, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { useMockSupabase } from './useMockSupabase';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

const generateGoogleCalendarUrl = (task: any) => {
  const formatDateTime = (date: string) => {
    return date ? new Date(date).toISOString().replace(/-|:|\./g, '') : '';
  };

  const title = encodeURIComponent(task.title);
  const details = encodeURIComponent(
    `Task: ${task.title}\n` +
    `Details: ${task.description}\n` +
    `Submission Link: ${task.submissionLink || 'None'}`
  );
  const dates = `${formatDateTime(task.dueDate)}/${formatDateTime(new Date(new Date(task.dueDate).getTime() + 60 * 60 * 1000))}`;
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dates}`;
};

export function TasksPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    submissionLink: '',
  });

  const { user, tasks, addTask, completeTask, deleteTask } = useMockSupabase();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.dueDate) {
      setModalMessage('Task title and due date are required!');
      setShowModal(true);
      return;
    }
    addTask(newTask);
    setNewTask({ title: '', description: '', dueDate: '', submissionLink: '' });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

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
            Organize your work and earn points for every completion
          </p>
        </div>

        {/* User Stats */}
        <Card className="mb-8 border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Welcome back,</div>
                  <div className="text-2xl" style={{ fontWeight: 700 }}>{user.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{user.points}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{activeTasks.length}</div>
                  <div className="text-sm text-muted-foreground">Active Tasks</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Task */}
        <Card className="mb-8 border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add a New Task
            </CardTitle>
            <CardDescription>Create a new task and earn points when you complete it</CardDescription>
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
                  <Label htmlFor="dueDate">Due Date & Time *</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="datetime-local"
                    value={newTask.dueDate}
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
                <Label htmlFor="submissionLink">Submission Link</Label>
                <Input
                  id="submissionLink"
                  name="submissionLink"
                  type="url"
                  value={newTask.submissionLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com (optional)"
                />
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
                    isOverdue(task.dueDate)
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
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(task.dueDate).toLocaleString()}</span>
                          </div>
                          {isOverdue(task.dueDate) && (
                            <Badge className="bg-destructive">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Overdue
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {task.submissionLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="gap-2"
                        >
                          <a
                            href={task.submissionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LinkIcon className="w-4 h-4" />
                            Submission Link
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
                        onClick={() => completeTask(task.id)}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark as Done
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-2"
                        onClick={() => deleteTask(task.id)}
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

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>Completed Tasks</h2>
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
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alert</DialogTitle>
            <DialogDescription>{modalMessage}</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowModal(false)} className="w-full">
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
