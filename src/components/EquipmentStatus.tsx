import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Equipment } from '../types/equipment';
import { format } from 'date-fns';

interface EquipmentStatusProps {
  equipment: Equipment;
}

const EquipmentStatus: React.FC<EquipmentStatusProps> = ({ equipment }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return 'text-green-500';
      case 'needs attention':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      case 'maintenance':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'needs attention':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'maintenance':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="mr-2">{equipment.name}</span>
        {getStatusIcon(equipment.status)}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</h3>
          <p className={`text-lg font-semibold ${getStatusColor(equipment.status)}`}>
            {equipment.status}
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Health Score</h3>
          <div className="flex items-center">
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5 mr-2">
              <div
                className={`h-2.5 rounded-full ${
                  equipment.health > 0.7 ? 'bg-green-500' : 
                  equipment.health > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${equipment.health * 100}%` }}
              ></div>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {Math.round(equipment.health * 100)}%
            </span>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Maintenance</h3>
          <p className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            {formatDate(equipment.lastMaintenance)}
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Next Maintenance</h3>
          <p className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            {formatDate(equipment.nextMaintenance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EquipmentStatus;