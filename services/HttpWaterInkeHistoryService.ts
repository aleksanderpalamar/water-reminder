import { WaterIntakeHistoryService, WaterIntakeServiceHistory } from "./WaterIntakeService";

export class HttpWaterIntakeHistoryService implements WaterIntakeHistoryService {
  async getWaterIntakeHistory(userId: string): Promise<WaterIntakeServiceHistory[]> {
    const response = await fetch(`/api/water-intake/history?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch water intake history");
    const data = await response.json();
    return data.history;
  }
}