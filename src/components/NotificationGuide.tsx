import { Bell, Calendar, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

export function NotificationGuide() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Setting Up Task Notifications
        </CardTitle>
        <CardDescription>Get reminded about your tasks as deadlines approach</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Listify integrates with Google Calendar to provide deadline notifications. Follow these steps to enable automatic reminders:
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1">
              1
            </div>
            <div className="flex-1">
              <h4 className="mb-1" style={{ fontWeight: 600 }}>Add Task to Google Calendar</h4>
              <p className="text-sm text-muted-foreground">
                When you create a task with a deadline, click the "Add to Calendar" button to open Google Calendar with your task pre-filled.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1">
              2
            </div>
            <div className="flex-1">
              <h4 className="mb-1" style={{ fontWeight: 600 }}>Configure Notifications</h4>
              <p className="text-sm text-muted-foreground mb-2">
                In Google Calendar, set up custom reminders:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• 1 week before (for long-term tasks)</li>
                <li>• 3 days before (early warning)</li>
                <li>• 1 day before (final reminder)</li>
                <li>• 1 hour before (urgent alert)</li>
                <li>• 15 minutes before (last call)</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1">
              3
            </div>
            <div className="flex-1">
              <h4 className="mb-1" style={{ fontWeight: 600 }}>Enable Push Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Make sure you've enabled Google Calendar notifications on your device (mobile app and/or browser) to receive real-time alerts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 border-2 border-green-500/20 rounded-lg">
            <Calendar className="w-5 h-5 text-green-600 mt-1" />
            <div className="flex-1">
              <h4 className="mb-1 text-green-900" style={{ fontWeight: 600 }}>Notification Frequency</h4>
              <p className="text-sm text-green-800">
                Notifications automatically increase in frequency as your deadline approaches, helping you stay on track and complete tasks on time for bonus points!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
