export interface WaterIntakeService {
  getWaterIntake(userId: string): Promise<{ waterIntake: number }>;
  getReminders(userId: string): Promise<{ reminders: Reminder[] }>;
  addWaterIntake(
    userId: string,
    amount: number
  ): Promise<{ waterIntake: number }>;
}

export interface Reminder {
  id: string;
  containerSize: number;
  reminderTime: string;
}
