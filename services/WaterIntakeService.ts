export interface WaterIntakeService {
  getWaterIntake(userId: string): Promise<{ waterIntake: number }>;
  getReminders(userId: string): Promise<{ reminders: Reminder[] }>;
  addWaterIntake(
    userId: string,
    amount: number
  ): Promise<{ waterIntake: number }>;
}

export interface ReminderService {
  getReminders(userId: string): Promise<Reminder[]>;
  addReminder(userId: string, containerSize: number, reminderTime: string): Promise<void>;
}

export interface Reminder {
  id: string;
  containerSize: number;
  reminderTime: string;
}
