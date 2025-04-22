import { collection, doc, onSnapshot, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Equipment, Reading } from '../types/equipment';

// Get a single equipment document
export const getEquipment = (equipmentId: string, callback: (equipment: Equipment | null) => void) => {
  return onSnapshot(doc(db, 'equipment', equipmentId), (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() } as Equipment);
    } else {
      callback(null);
    }
  });
};

// Get all equipment
export const getAllEquipment = (callback: (equipments: Equipment[]) => void) => {
  return onSnapshot(collection(db, 'equipment'), (snapshot) => {
    const equipmentList: Equipment[] = [];
    snapshot.forEach((doc) => {
      equipmentList.push({ id: doc.id, ...doc.data() } as Equipment);
    });
    callback(equipmentList);
  });
};

// Get historical readings for a specific equipment
export const getHistoricalReadings = async (equipmentId: string, limit = 50): Promise<Reading[]> => {
  const readingsRef = collection(db, 'equipment', equipmentId, 'readings');
  const q = query(readingsRef, orderBy('timestamp', 'desc'), limit(limit));
  
  const snapshot = await getDocs(q);
  const readings: Reading[] = [];
  
  snapshot.forEach((doc) => {
    readings.push(doc.data() as Reading);
  });
  
  return readings.reverse(); // Reverse to get chronological order
};

// Calculate vibration from acceleration values
export const calculateVibration = (ax: number, ay: number, az: number): number => {
  return Math.sqrt(ax * ax + ay * ay + az * az) / 16384.0; // Convert to g's
};

// Mock data generator for development
export const generateMockData = (): Reading => {
  const getRandomValue = (min: number, max: number) => {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
  };
  
  const ax = getRandomValue(-16384, 16384);
  const ay = getRandomValue(-16384, 16384);
  const az = getRandomValue(-16384, 16384);
  
  return {
    rpm: getRandomValue(1400, 1700),
    voltage: getRandomValue(14, 18),
    temperature: getRandomValue(60, 90),
    humidity: getRandomValue(30, 70),
    vibration: calculateVibration(ax, ay, az),
    accelerationX: ax,
    accelerationY: ay,
    accelerationZ: az,
    timestamp: new Date().toISOString()
  };
};