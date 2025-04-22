import React from 'react';
import { Link } from 'react-router-dom';
import { useEquipmentData } from '../hooks/useEquipmentData';
import ParameterCard from './ParameterCard';
import ParameterChart from './ParameterChart';
import EquipmentStatus from './EquipmentStatus';
import ThresholdSettings from './ThresholdSettings';
import { AlertTriangle, Settings, ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const equipmentId = 'mock-equipment-1';
  const { 
    equipment,
    loading, 
    error, 
    alerts, 
    mockData,
    thresholds,
    updateThresholds
  } = useEquipmentData(equipmentId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center"
        >
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error Loading Data</h2>
          <p className="text-gray-600 dark:text-gray-400">{error || 'Could not find equipment data'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  const latestReading = mockData.length > 0 ? mockData[mockData.length - 1] : {
    rpm: 0,
    voltage: 0,
    temperature: 0,
    humidity: 0,
    vibration: 0,
    accelerationX: 0,
    accelerationY: 0,
    accelerationZ: 0,
    timestamp: ''
  };

  const alertCount = Object.values(alerts).filter(alert => alert).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link 
              to="/"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back</span>
            </Link>
            <h1 className="text-2xl font-bold">Industrial Equipment Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {alertCount > 0 && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium flex items-center"
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                {alertCount} Alert{alertCount > 1 ? 's' : ''}
              </motion.div>
            )}
            <ThresholdSettings 
              thresholds={thresholds}
              onUpdateThresholds={updateThresholds}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            <EquipmentStatus equipment={equipment} />
          </div>
          
          <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: "Voltage", value: latestReading.voltage, unit: "V", type: "voltage" },
              { title: "RPM", value: latestReading.rpm, unit: "", type: "rpm" },
              { title: "Temperature", value: latestReading.temperature, unit: "°C", type: "temperature" },
              { title: "Humidity", value: latestReading.humidity, unit: "%", type: "humidity" },
              { title: "Vibration", value: latestReading.vibration, unit: "g", type: "vibration" }
            ].map((param) => (
              <motion.div
                key={param.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ParameterCard
                  title={param.title}
                  value={param.value}
                  unit={param.unit}
                  type={param.type as any}
                  alerts={alerts}
                  thresholds={thresholds}
                />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ParameterChart
              data={mockData}
              parameter="voltage"
              thresholds={thresholds}
              color="#3B82F6"
            />
          </motion.div>
          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ParameterChart
              data={mockData}
              parameter="rpm"
              thresholds={thresholds}
              color="#10B981"
            />
          </motion.div>
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ParameterChart
              data={mockData}
              parameter="temperature"
              thresholds={thresholds}
              color="#F59E0B"
            />
          </motion.div>
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ParameterChart
              data={mockData}
              parameter="humidity"
              thresholds={thresholds}
              color="#6366F1"
            />
          </motion.div>
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ParameterChart
              data={mockData}
              parameter="vibration"
              thresholds={thresholds}
              color="#EC4899"
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;