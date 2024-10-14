"use client";

import { HttpReminderService } from "@/services/HttpReminderService";
import { HttpWaterIntakeService } from "@/services/HttpWaterIntakeService";
import { ReminderService, WaterIntakeService } from "@/services/WaterIntakeService";
import { createContext, useContext } from "react";

interface ServiceContext {
  waterIntakeService: WaterIntakeService
  reminderService: ReminderService
}

const ServiceContext = createContext<ServiceContext | null>(null);

export const ServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const waterIntakeService = new HttpWaterIntakeService();
  const reminderService = new HttpReminderService();

  return (
    <ServiceContext.Provider value={{ waterIntakeService, reminderService }}>
      {children}
    </ServiceContext.Provider>
  )
}

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useWaterIntakeService must be used within a ServiceProvider');
  }
  return context;
};