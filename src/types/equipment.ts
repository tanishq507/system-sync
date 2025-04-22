export interface Reading {
  rpm: number;
  voltage: number;
  temperature: number;
  humidity: number;
  vibration: number;
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;
  timestamp: string;
}

export interface Equipment {
  id: string;
  name: string;
  status: string;
  health: number;
  lastMaintenance: string;
  nextMaintenance: string;
  readings: Reading[];
  anomalyThreshold: number;
}

export interface ThresholdConfig {
  voltage: number;
  rpm: number;
  temperature: number;
  humidity: number;
  vibration: number;
}

export interface AlertState {
  voltage: boolean;
  rpm: boolean;
  temperature: boolean;
  humidity: boolean;
  vibration: boolean;
}