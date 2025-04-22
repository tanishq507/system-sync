import { useState, useEffect } from 'react';
import { getEquipment, generateMockData } from '../services/equipmentService';
import { Equipment, Reading, AlertState, ThresholdConfig } from '../types/equipment';

// Default threshold configuration
export const DEFAULT_THRESHOLDS: ThresholdConfig = {
  voltage: 16,
  rpm: 1600,
  temperature: 85,
  humidity: 70,
  vibration: 0.8
};

export const useEquipmentData = (equipmentId: string) => {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<AlertState>({
    voltage: false,
    rpm: false,
    temperature: false,
    humidity: false,
    vibration: false
  });
  const [thresholds, setThresholds] = useState<ThresholdConfig>(DEFAULT_THRESHOLDS);
  const [mockData, setMockData] = useState<Reading[]>([]);

  // Update alerts based on latest readings and thresholds
  const updateAlerts = (latestReading: Reading) => {
    setAlerts({
      voltage: latestReading.voltage > thresholds.voltage,
      rpm: latestReading.rpm > thresholds.rpm,
      temperature: latestReading.temperature > thresholds.temperature,
      humidity: latestReading.humidity > thresholds.humidity,
      vibration: latestReading.vibration > thresholds.vibration
    });
  };

  // For demo purposes, generate mock data and update equipment
  useEffect(() => {
    const interval = setInterval(() => {
      const newReading = generateMockData();
      setMockData(prev => [...prev.slice(-29), newReading]);
      updateAlerts(newReading);
    }, 3000);

    return () => clearInterval(interval);
  }, [thresholds]);

  // Fetch equipment data
  useEffect(() => {
    setLoading(true);
    
    try {
      // For development, we'll use both Firebase and mock data
      const unsubscribe = getEquipment(equipmentId, (equipmentData) => {
        if (equipmentData) {
          setEquipment(equipmentData);
        } else {
          // If equipment doesn't exist in Firebase, create mock equipment
          const mockEquipment: Equipment = {
            id: 'mock-equipment-1',
            name: 'Industrial Motor Unit #A42',
            status: 'Operational',
            health: 0.95,
            lastMaintenance: '2025-04-16T12:41:23Z',
            nextMaintenance: '2025-05-16T12:41:23Z',
            readings: [],
            anomalyThreshold: 0.1
          };
          setEquipment(mockEquipment);
        }
        setLoading(false);
      });

      // Generate initial mock data
      const initialMockData: Reading[] = [];
      for (let i = 0; i < 30; i++) {
        initialMockData.push(generateMockData());
      }
      setMockData(initialMockData);
      
      return () => unsubscribe();
    } catch (err) {
      setError('Failed to fetch equipment data');
      setLoading(false);
    }
  }, [equipmentId]);

  // Update threshold configuration
  const updateThresholds = (newThresholds: Partial<ThresholdConfig>) => {
    setThresholds(prev => ({ ...prev, ...newThresholds }));
  };

  return { 
    equipment, 
    loading, 
    error, 
    alerts, 
    mockData, 
    thresholds, 
    updateThresholds 
  };
};