import { Reminder, ReminderService } from "./WaterIntakeService";

export class HttpReminderService implements ReminderService {
  async getReminders(userId: string): Promise<Reminder[]> {
    const response = await fetch(`/api/reminders?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch reminders');
    const data = await response.json();
    return data.reminders;
  }

  async addReminder(userId: string, containerSize: number, reminderTime: string): Promise<void> {
    const response = await fetch('/api/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, containerSize, reminderTime }),
    });
    if (!response.ok) throw new Error('Failed to add reminder');
  }
}