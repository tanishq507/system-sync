"use client"

import type React from "react"
import { AlertTriangle, Thermometer, Droplets, Zap, Gauge, Activity } from "lucide-react"
import type { AlertState, ThresholdConfig } from "../types/equipment"
import { motion } from "framer-motion"

interface ParameterCardProps {
  title: string
  value: number
  unit: string
  type: "voltage" | "rpm" | "temperature" | "humidity" | "vibration"
  alerts: AlertState
  thresholds: ThresholdConfig
}

const ParameterCard: React.FC<ParameterCardProps> = ({ title, value, unit, type, alerts, thresholds }) => {
  const isAlert = alerts[type]
  const threshold = thresholds[type]

  const getPercentage = () => {
    switch (type) {
      case "voltage":
        return (value / (threshold * 1.5)) * 100
      case "rpm":
        return (value / (threshold * 1.5)) * 100
      case "temperature":
        return (value / (threshold * 1.2)) * 100
      case "humidity":
        return (value / 100) * 100
      case "vibration":
        return (value / 1) * 100
      default:
        return 0
    }
  }

  const percentage = Math.min(getPercentage(), 100)

  // Status determination
  const getStatus = () => {
    if (isAlert) return "critical"
    if (percentage > 80) return "warning"
    if (percentage > 60) return "attention"
    return "normal"
  }

  const status = getStatus()

  // Color schemes based on status
  const colorSchemes = {
    critical: {
      primary: "from-rose-500 to-red-600",
      secondary: "bg-rose-500",
      text: "text-rose-600 dark:text-rose-400",
      light: "bg-rose-50 dark:bg-rose-950/30",
      border: "border-rose-200 dark:border-rose-800",
      icon: "text-rose-500 dark:text-rose-400",
      shadow: "shadow-rose-500/20",
      ring: "ring-rose-500/20",
    },
    warning: {
      primary: "from-amber-400 to-orange-500",
      secondary: "bg-amber-500",
      text: "text-amber-600 dark:text-amber-400",
      light: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800",
      icon: "text-amber-500 dark:text-amber-400",
      shadow: "shadow-amber-500/20",
      ring: "ring-amber-500/20",
    },
    attention: {
      primary: "from-yellow-400 to-amber-400",
      secondary: "bg-yellow-400",
      text: "text-yellow-600 dark:text-yellow-400",
      light: "bg-yellow-50 dark:bg-yellow-950/30",
      border: "border-yellow-200 dark:border-yellow-800",
      icon: "text-yellow-500 dark:text-yellow-400",
      shadow: "shadow-yellow-500/20",
      ring: "ring-yellow-500/20",
    },
    normal: {
      primary: "from-teal-400 to-emerald-500",
      secondary: "bg-teal-500",
      text: "text-teal-600 dark:text-teal-400",
      light: "bg-teal-50 dark:bg-teal-950/30",
      border: "border-teal-200 dark:border-teal-800",
      icon: "text-teal-500 dark:text-teal-400",
      shadow: "shadow-teal-500/20",
      ring: "ring-teal-500/20",
    },
  }

  const colors = colorSchemes[status]

  const getIcon = () => {
    switch (type) {
      case "voltage":
        return <Zap className={`h-5 w-5 ${colors.icon}`} />
      case "rpm":
        return <Gauge className={`h-5 w-5 ${colors.icon}`} />
      case "temperature":
        return <Thermometer className={`h-5 w-5 ${colors.icon}`} />
      case "humidity":
        return <Droplets className={`h-5 w-5 ${colors.icon}`} />
      case "vibration":
        return <Activity className={`h-5 w-5 ${colors.icon}`} />
      default:
        return null
    }
  }

  const getStatusLabel = () => {
    switch (status) {
      case "critical":
        return "Critical"
      case "warning":
        return "Warning"
      case "attention":
        return "Attention"
      case "normal":
        return "Normal"
    }
  }

  return (
    <motion.div
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      className={`relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 ${colors.shadow} shadow-lg
        border border-gray-100 dark:border-gray-800 p-5 transition-all duration-300`}
    >
      {/* Status indicator strip */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors.primary}`}></div>

      {/* Alert badge */}
      {isAlert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              repeatType: "reverse",
            }}
            className={`rounded-full p-1.5 ${colors.light}`}
          >
            <AlertTriangle className={`h-4 w-4 ${colors.icon}`} />
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex items-center space-x-2 mb-4 mt-2">
        <div className={`rounded-lg p-2 ${colors.light}`}>{getIcon()}</div>
        <h3 className="text-base font-medium text-gray-700 dark:text-gray-200">{title}</h3>
      </div>

      {/* Value display */}
      <div className="mb-4">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-baseline"
        >
          <span className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">{value.toFixed(2)}</span>
          <span className="ml-1 text-lg text-gray-500 dark:text-gray-400">{unit}</span>
        </motion.div>

        {/* Status label */}
        <div className="flex items-center mt-1">
          <div className={`h-2 w-2 rounded-full ${colors.secondary} mr-2`}></div>
          <span className={`text-xs font-medium ${colors.text}`}>{getStatusLabel()}</span>
        </div>
      </div>

      {/* Progress visualization */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-medium text-gray-500 dark:text-gray-400">Current</span>
          <span className="font-medium text-gray-500 dark:text-gray-400">
            Threshold:{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {threshold} {unit}
            </span>
          </span>
        </div>

        <div className="relative">
          {/* Background track */}
          <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            {/* Filled track */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className={`h-full bg-gradient-to-r ${colors.primary} rounded-full`}
            />

            {/* Threshold marker */}
            <div
              className="absolute top-0 h-full w-0.5 bg-gray-400 dark:bg-gray-500"
              style={{
                left: `${(threshold / (threshold * 1.5)) * 100}%`,
                height: "12px",
              }}
            />
          </div>

          {/* Percentage indicator */}
          <div className="mt-1 text-right">
            <span className={`text-xs font-semibold ${colors.text}`}>{percentage.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-transparent to-transparent"></div>
    </motion.div>
  )
}

export default ParameterCard
