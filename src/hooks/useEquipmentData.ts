import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
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
  const [readings, setReadings] = useState<Reading[]>([]);

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

  // Fetch equipment data and readings
  useEffect(() => {
    setLoading(true);
    
    try {
      // Subscribe to equipment document
      const unsubscribeEquipment = onSnapshot(doc(db, 'equipment', equipmentId), (doc) => {
        if (doc.exists()) {
          setEquipment({ id: doc.id, ...doc.data() } as Equipment);
        } else {
          setError('Equipment not found');
        }
      }, (error) => {
        console.error('Error fetching equipment:', error);
        setError('Failed to fetch equipment data');
      });

      // Subscribe to readings collection
      const readingsRef = collection(db, 'equipment', equipmentId, 'readings');
      const readingsQuery = query(readingsRef, orderBy('timestamp', 'desc'), limit(30));
      
      const unsubscribeReadings = onSnapshot(readingsQuery, (snapshot) => {
        const newReadings: Reading[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          // Calculate vibration from acceleration values if needed
          const reading: Reading = {
            ...data,
            vibration: data.vibration || calculateVibration(data.accelerationX, data.accelerationY, data.accelerationZ),
          } as Reading;
          newReadings.push(reading);
        });
        
        // Sort readings by timestamp
        const sortedReadings = newReadings.sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        
        setReadings(sortedReadings);
        
        if (sortedReadings.length > 0) {
          updateAlerts(sortedReadings[sortedReadings.length - 1]);
        }
        
        setLoading(false);
      }, (error) => {
        console.error('Error fetching readings:', error);
        setError('Failed to fetch readings');
        setLoading(false);
      });

      return () => {
        unsubscribeEquipment();
        unsubscribeReadings();
      };
    } catch (err) {
      console.error('Error in useEquipmentData:', err);
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
    mockData: readings, // Keep the same prop name for compatibility
    thresholds, 
    updateThresholds 
  };
};

// Helper function to calculate vibration from acceleration values
const calculateVibration = (ax: number, ay: number, az: number): number => {
  return Math.sqrt(ax * ax + ay * ay + az * az) / 16384.0; // Convert to g's
};