"use client";

import { HttpReminderService } from "@/services/HttpReminderService";
import { HttpWaterIntakeHistoryService } from "@/services/HttpWaterInkeHistoryService";
import { HttpWaterIntakeService } from "@/services/HttpWaterIntakeService";
import { ReminderService, WaterIntakeHistoryService, WaterIntakeService } from "@/services/WaterIntakeService";
import { createContext } from "react";

interface ServiceContext {
  waterIntakeService: WaterIntakeService
  reminderService: ReminderService
  waterIntakeHistoryService: WaterIntakeHistoryService;
}

export const ServiceContext = createContext<ServiceContext | null>(null);

export const ServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const waterIntakeService = new HttpWaterIntakeService();
  const reminderService = new HttpReminderService();
  const waterIntakeHistoryService = new HttpWaterIntakeHistoryService();

  return (
    <ServiceContext.Provider value={{ waterIntakeService, reminderService, waterIntakeHistoryService }}>
      {children}
    </ServiceContext.Provider>
  )
}