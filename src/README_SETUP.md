# Listify - Gamified Task Management Application

## Overview

Listify is a comprehensive task management platform that combines productivity tools with gamification mechanics. Users can create tasks, earn points, compete on leaderboards, and unlock rewards while building productive habits.

## Key Features

### 🎯 Task Management
- Create tasks with titles, descriptions, deadlines, and links
- **Deadline Locking**: Once a deadline is set, it cannot be changed
- Add subtasks with checkboxes for step-by-step completion
- Tasks are automatically removed 4 days after completion (to keep the list clean)
- Link attachments for relevant resources

### 📅 Google Calendar Integration
- Click "Add to Calendar" button on any task to add it to Google Calendar
- Set up custom notification reminders in Google Calendar:
  - 1 week before (for planning)
  - 3 days before (early warning)
  - 1 day before (preparation)
  - 1 hour before (urgent)
  - 15 minutes before (final alert)
- Notifications increase in frequency as deadline approaches

### 🎮 Gamification System

#### Points System
- **5 points**: Completing any task
- **+15 bonus points**: Completing task before deadline (20 points total)
- Points cannot be modified or cheated - they're server-controlled

#### Ranking Tiers (Based on Total Points)
1. **Bronze**: 0+ points (Starting tier)
2. **Iron**: 300+ points
3. **Copper**: 750+ points
4. **Silver**: 1,500+ points
5. **Gold**: 3,000+ points
6. **Platinum**: 5,000+ points
7. **Ruby**: 7,500+ points
8. **Legendary**: 10,000+ points

### 🔥 Streak System
- Daily streak based on completing tasks on time
- Streak breaks if you miss a day or complete tasks late
- View current streak and longest streak
- Streak data visible on leaderboard

### 🏆 Leaderboards
- **Global Leaderboard**: Compete with all users
- **Friends Leaderboard**: Compete with friends only
- Rankings update in real-time based on points
- Display user stats: points, rank tier, streak

### 🎁 Rewards Store
- Spend earned points on cosmetic items:
  - **Badges** (100-200 points): Champion, Star Performer, On Fire
  - **Themes** (250-300 points): Dark Mode, Ocean, Sunset
  - **Backgrounds** (400-500 points): Gradient, Galaxy
- Once purchased, items cannot be bought again
- View purchased items on Profile page

### 👥 Social Features
- Add friends by email
- View friends' stats and progress
- Compete on friends-only leaderboard
- Future: Group challenges, collaborative tasks

### 📊 Progress Tracker
- View daily completion statistics
- 7-day activity chart
- Streak heatmap visualization
- Completion rate and on-time rate metrics
- Historical data tracking

### 👤 Profile Page
- Edit name and email
- View total points, current rank, and streak
- See all purchased items
- Track performance statistics
- Account age and total tasks completed

## Authentication

### Supported Methods
1. **Email/Password**: Create account with email and password
2. **Google OAuth**: Sign in with Google account

### Google OAuth Setup (Optional)
To enable Google login, you need to configure Google OAuth in Supabase:

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable Google provider
4. Follow the setup guide at: https://supabase.com/docs/guides/auth/social-login/auth-google
5. Add your Google OAuth credentials

Without this setup, users can still use email/password authentication.

## Technical Architecture

### Backend (Supabase)
- **Authentication**: Supabase Auth with email/password and Google OAuth
- **Database**: Key-value store for user profiles, tasks, rewards
- **Server**: Hono web server running on Supabase Edge Functions
- **Real-time**: Automatic data synchronization

### Frontend (React + TypeScript)
- Component-based architecture
- Real-time updates from Supabase
- Responsive design with Tailwind CSS
- Toast notifications for user feedback
- Charts with Recharts library

### Data Structure

#### User Profile
```typescript
{
  id: string,
  name: string,
  email: string,
  points: number,
  rank: string, // Bronze, Iron, Copper, etc.
  streak: number,
  longestStreak: number,
  lastTaskDate: timestamp,
  totalTasksCompleted: number,
  tasksCompletedOnTime: number,
  purchasedItems: string[],
  friends: string[],
  badges: string[],
  createdAt: timestamp
}
```

#### Task
```typescript
{
  id: string,
  userId: string,
  title: string,
  description: string,
  deadline: timestamp,
  link: string,
  subtasks: Array<{
    id: string,
    text: string,
    completed: boolean
  }>,
  completed: boolean,
  completedAt: timestamp,
  createdAt: timestamp,
  deadlineLocked: boolean
}
```

## API Endpoints

### Authentication
- `POST /make-server-86e7a7bb/signup` - Create new user account

### Profile
- `GET /make-server-86e7a7bb/profile` - Get user profile
- `PUT /make-server-86e7a7bb/profile` - Update profile

### Tasks
- `GET /make-server-86e7a7bb/tasks` - Get all user tasks
- `POST /make-server-86e7a7bb/tasks` - Create new task
- `PUT /make-server-86e7a7bb/tasks/:id` - Update task (deadline locked)
- `POST /make-server-86e7a7bb/tasks/:id/complete` - Complete task and award points
- `DELETE /make-server-86e7a7bb/tasks/:id` - Delete task

### Leaderboards
- `GET /make-server-86e7a7bb/leaderboard/global` - Global leaderboard
- `GET /make-server-86e7a7bb/leaderboard/friends` - Friends leaderboard

### Rewards
- `GET /make-server-86e7a7bb/rewards` - Get all available rewards
- `POST /make-server-86e7a7bb/rewards/purchase` - Purchase reward

### Analytics
- `GET /make-server-86e7a7bb/analytics` - Get user analytics

### Friends
- `GET /make-server-86e7a7bb/friends` - Get friends list
- `POST /make-server-86e7a7bb/friends/add` - Add friend by email

## Points & Rewards Economy

### How to Earn Points
1. Complete any task: **5 points**
2. Complete before deadline: **+15 bonus** (20 total)
3. Build streaks for consistent productivity

### Point Requirements by Tier
- Bronze: Start
- Iron: 300 pts (60 on-time tasks)
- Copper: 750 pts (150 on-time tasks or 37.5 on-time)
- Silver: 1,500 pts (75 on-time tasks)
- Gold: 3,000 pts (150 on-time tasks)
- Platinum: 5,000 pts (250 on-time tasks)
- Ruby: 7,500 pts (375 on-time tasks)
- Legendary: 10,000 pts (500 on-time tasks)

### Reward Pricing Strategy
- Badges: 100-200 points
- Themes: 250-300 points
- Backgrounds: 400-500 points

This ensures users need to complete ~5-25 on-time tasks to afford items.

## Best Practices

### For Users
1. **Set Realistic Deadlines**: Once set, they can't be changed
2. **Use Google Calendar**: Set up notifications to never miss a deadline
3. **Complete Tasks Early**: Get 4x more points (20 vs 5)
4. **Build Streaks**: Consistent completion builds habits
5. **Add Friends**: Compete and stay motivated
6. **Use Subtasks**: Break down complex tasks

### For Developers
1. **Never modify points directly**: Use the complete endpoint
2. **Validate all inputs**: Server-side validation is critical
3. **Lock deadlines**: Enforced at API level
4. **Real-time updates**: Keep UI in sync with backend
5. **Error handling**: Always show user-friendly messages

## Limitations & Notes

### Current Implementation
- ⚠️ **Figma Make Notice**: This environment is not intended for collecting PII or securing highly sensitive data
- Notifications require Google Calendar setup (not automatic)
- Email server not configured (email_confirm: true for signup)
- No password reset functionality (would require email server)

### Future Enhancements
- Group challenges
- Collaborative tasks
- Direct messaging between friends
- Custom point values per task
- AI task suggestions
- Mobile app
- Email notifications
- Push notifications

## Troubleshooting

### Google OAuth Not Working
- Ensure you've completed setup at the Supabase dashboard
- Check that redirect URLs are configured correctly
- Email/password login always works as fallback

### Tasks Not Appearing
- Check browser console for errors
- Verify user is authenticated
- Try refreshing the page

### Points Not Updating
- Points only update when completing tasks via the "Complete" button
- Ensure task has a valid deadline
- Check that task wasn't already completed

### Streak Reset
- Streaks require completing tasks on time
- Missing a day resets the streak
- Completing tasks late doesn't count toward streak

## Security Considerations

1. **Authentication**: All API calls require valid auth token
2. **Authorization**: Users can only access their own data
3. **Data Validation**: Server validates all inputs
4. **Rate Limiting**: Consider implementing for production
5. **PII**: Minimal personal data collected (name, email)

## Support

For issues or questions:
1. Check browser console for errors
2. Verify authentication status
3. Review this documentation
4. Check Supabase logs for backend errors

---

**Version**: 1.0.0  
**Last Updated**: November 27, 2024  
**Platform**: Figma Make with Supabase Backend
