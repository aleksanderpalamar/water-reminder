"use client";

import { HttpWaterIntakeService } from "@/services/HttpWaterIntakeService";
import { WaterIntakeService } from "@/services/WaterIntakeService";
import { createContext, useContext } from "react";

const WaterIntakeContext = createContext<WaterIntakeService | null>(null);

export const WaterIntakeProvider = ({ children }: { children: React.ReactNode }) => {
  const waterIntakeService = new HttpWaterIntakeService();

  return (
    <WaterIntakeContext.Provider value={waterIntakeService}>
      {children}
    </WaterIntakeContext.Provider>
  )
}

export const useWaterIntakeService = () => {
  const context = useContext(WaterIntakeContext);
  if (!context) {
    throw new Error('useWaterIntakeService must be used within a WaterIntakeProvider');
  }
  return context;
};