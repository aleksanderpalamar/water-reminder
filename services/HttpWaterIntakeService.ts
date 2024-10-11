import { WaterIntakeService } from "./WaterIntakeService";

export class HttpWaterIntakeService implements WaterIntakeService {
  async getWaterIntake(userId: string) {
    const response = await fetch(`/api/water-intake?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch water intake");
    return response.json();
  }

  async getReminders(userId: string) {
    const response = await fetch(`/api/reminders?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch reminders");
    return response.json();
  }

  async addWaterIntake(userId: string, amount: number) {
    const response = await fetch(`/api/water-intake`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, amount })
    });

    if (!response.ok) throw new Error("Failed to add water intake");
    return response.json();
  }
}
