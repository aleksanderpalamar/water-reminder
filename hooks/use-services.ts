import { ServiceContext } from "@/contexts/WaterIntakeContext";
import { useContext } from "react";

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useWaterIntakeService must be used within a ServiceProvider');
  }
  return context;
};