import React, { useState } from 'react';
import { ThresholdConfig, DEFAULT_THRESHOLDS } from '../hooks/useEquipmentData';
import { Save, X } from 'lucide-react';

interface ThresholdSettingsProps {
  thresholds: ThresholdConfig;
  onUpdateThresholds: (thresholds: Partial<ThresholdConfig>) => void;
}

const ThresholdSettings: React.FC<ThresholdSettingsProps> = ({
  thresholds,
  onUpdateThresholds,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState<ThresholdConfig>(thresholds);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: parseFloat(value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateThresholds(formValues);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFormValues(DEFAULT_THRESHOLDS);
    onUpdateThresholds(DEFAULT_THRESHOLDS);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow transition-colors duration-300 flex items-center"
      >
        Threshold Settings
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Alert Threshold Settings
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Voltage Threshold (V)
                  </label>
                  <input
                    type="number"
                    name="voltage"
                    value={formValues.voltage}
                    onChange={handleChange}
                    step="0.1"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    RPM Threshold
                  </label>
                  <input
                    type="number"
                    name="rpm"
                    value={formValues.rpm}
                    onChange={handleChange}
                    step="10"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Temperature Threshold (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    value={formValues.temperature}
                    onChange={handleChange}
                    step="1"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Humidity Threshold (%)
                  </label>
                  <input
                    type="number"
                    name="humidity"
                    value={formValues.humidity}
                    onChange={handleChange}
                    step="1"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vibration Threshold (g)
                  </label>
                  <input
                    type="number"
                    name="vibration"
                    value={formValues.vibration}
                    onChange={handleChange}
                    step="0.1"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save Settings
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-md"
                >
                  Reset Defaults
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThresholdSettings;