import type React from "react"
import { CheckCircle, AlertCircle, Clock, PenToolIcon as Tool } from "lucide-react"
import type { Equipment } from "../types/equipment"
import { format } from "date-fns"

interface EquipmentStatusProps {
  equipment: Equipment
}

const EquipmentStatus: React.FC<EquipmentStatusProps> = ({ equipment }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "operational":
        return "text-green-500 bg-green-50 dark:bg-green-900/20"
      case "needs attention":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
      case "critical":
        return "text-red-500 bg-red-50 dark:bg-red-900/20"
      case "maintenance":
        return "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-700/50"
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "operational":
        return "from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-900/20"
      case "needs attention":
        return "from-yellow-50 to-yellow-100 dark:from-yellow-900/10 dark:to-yellow-900/20"
      case "critical":
        return "from-red-50 to-red-100 dark:from-red-900/10 dark:to-red-900/20"
      case "maintenance":
        return "from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/20"
      default:
        return "from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "operational":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "needs attention":
        return <AlertCircle className="h-6 w-6 text-yellow-500" />
      case "critical":
        return <AlertCircle className="h-6 w-6 text-red-500" />
      case "maintenance":
        return <Tool className="h-6 w-6 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div
        className={`bg-gradient-to-r ${getStatusBgColor(equipment.status)} px-6 py-4 border-b border-gray-100 dark:border-gray-700`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{equipment.name}</h2>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(equipment.status)}`}>
            {getStatusIcon(equipment.status)}
            <span className="font-medium">{equipment.status}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Health Score</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mr-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full ${
                    equipment.health > 0.7
                      ? "bg-gradient-to-r from-green-400 to-green-500"
                      : equipment.health > 0.4
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                        : "bg-gradient-to-r from-red-400 to-red-500"
                  }`}
                  style={{ width: `${equipment.health * 100}%`, transition: "width 1s ease-in-out" }}
                ></div>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {Math.round(equipment.health * 100)}%
              </span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Last Maintenance</h3>
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatDate(equipment.lastMaintenance)}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Next Maintenance</h3>
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full">
                <Clock className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatDate(equipment.nextMaintenance)}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Uptime</h3>
            <div className="flex items-center space-x-2">
              <div
                className={`p-2 rounded-full ${
                  equipment.health > 0.7
                    ? "bg-green-100 dark:bg-green-900/20"
                    : equipment.health > 0.4
                      ? "bg-yellow-100 dark:bg-yellow-900/20"
                      : "bg-red-100 dark:bg-red-900/20"
                }`}
              >
                <CheckCircle
                  className={`h-5 w-5 ${
                    equipment.health > 0.7
                      ? "text-green-500"
                      : equipment.health > 0.4
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {Math.round(equipment.health * 365)} days/year
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EquipmentStatus
