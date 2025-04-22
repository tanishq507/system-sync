"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts"
import type { Reading, ThresholdConfig } from "../types/equipment"
import { format, parseISO } from "date-fns"
import { motion } from "framer-motion"
import { Clock, AlertTriangle, TrendingUp, ArrowRight } from "lucide-react"

interface ParameterChartProps {
  data: Reading[]
  parameter: "voltage" | "rpm" | "temperature" | "humidity" | "vibration"
  thresholds: ThresholdConfig
  color?: string
}

const ParameterChart: React.FC<ParameterChartProps> = ({ data, parameter, thresholds, color = "#3B82F6" }) => {
  const [timeRange, setTimeRange] = useState<"all" | "5min" | "15min" | "30min">("all")

  // Calculate if any readings exceed threshold
  const hasExceededThreshold = useMemo(() => {
    return data.some((reading) => reading[parameter] > thresholds[parameter])
  }, [data, parameter, thresholds])

  // Get parameter metadata
  const getParameterInfo = () => {
    switch (parameter) {
      case "voltage":
        return {
          label: "Voltage",
          unit: "V",
          icon: <TrendingUp className="w-5 h-5" />,
          gradientStart: "#3B82F6",
          gradientEnd: "rgba(59, 130, 246, 0.1)",
        }
      case "rpm":
        return {
          label: "RPM",
          unit: "",
          icon: <TrendingUp className="w-5 h-5" />,
          gradientStart: "#8B5CF6",
          gradientEnd: "rgba(139, 92, 246, 0.1)",
        }
      case "temperature":
        return {
          label: "Temperature",
          unit: "°C",
          icon: <TrendingUp className="w-5 h-5" />,
          gradientStart: "#EC4899",
          gradientEnd: "rgba(236, 72, 153, 0.1)",
        }
      case "humidity":
        return {
          label: "Humidity",
          unit: "%",
          icon: <TrendingUp className="w-5 h-5" />,
          gradientStart: "#10B981",
          gradientEnd: "rgba(16, 185, 129, 0.1)",
        }
      case "vibration":
        return {
          label: "Vibration",
          unit: "g",
          icon: <TrendingUp className="w-5 h-5" />,
          gradientStart: "#F59E0B",
          gradientEnd: "rgba(245, 158, 11, 0.1)",
        }
      default:
        return {
          label: "",
          unit: "",
          icon: <TrendingUp className="w-5 h-5" />,
          gradientStart: color,
          gradientEnd: `${color}33`,
        }
    }
  }

  const paramInfo = getParameterInfo()
  const actualColor = paramInfo.gradientStart

  const formatXAxis = (tickItem: string) => {
    try {
      return format(parseISO(tickItem), "HH:mm:ss")
    } catch (error) {
      return ""
    }
  }

  const getThresholdValue = () => {
    return thresholds[parameter]
  }

  const filteredData = () => {
    if (timeRange === "all") return data

    const now = new Date()
    let msAgo = 0

    switch (timeRange) {
      case "5min":
        msAgo = 5 * 60 * 1000
        break
      case "15min":
        msAgo = 15 * 60 * 1000
        break
      case "30min":
        msAgo = 30 * 60 * 1000
        break
    }

    const cutoff = new Date(now.getTime() - msAgo)
    return data.filter((reading) => {
      try {
        return new Date(reading.timestamp) > cutoff
      } catch (error) {
        return true
      }
    })
  }

  // Calculate statistics
  const stats = useMemo(() => {
    const values = data.map((item) => item[parameter])
    return {
      min: Math.min(...values).toFixed(2),
      max: Math.max(...values).toFixed(2),
      avg: (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2),
      current: values[values.length - 1]?.toFixed(2) || "0.00",
    }
  }, [data, parameter])

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value
      const isAboveThreshold = value > getThresholdValue()

      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {format(parseISO(label), "MMM d, yyyy HH:mm:ss")}
          </p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{paramInfo.label}:</span>
            <span
              className={`text-base font-bold ${isAboveThreshold ? "text-red-500" : "text-gray-900 dark:text-white"}`}
            >
              {value.toFixed(2)} {paramInfo.unit}
            </span>
          </div>
          {isAboveThreshold && (
            <div className="flex items-center mt-1 text-xs text-red-500">
              <AlertTriangle className="w-3 h-3 mr-1" />
              <span>Above threshold</span>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg bg-opacity-10 mr-3`} style={{ backgroundColor: `${actualColor}20` }}>
              <div className="text-[color]" style={{ color: actualColor }}>
                {paramInfo.icon}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                {paramInfo.label} Trend
                {hasExceededThreshold && (
                  <span className="ml-2 inline-flex items-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                    >
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    </motion.div>
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Threshold:{" "}
                <span className="font-medium text-red-500">
                  {getThresholdValue()} {paramInfo.unit}
                </span>
              </p>
            </div>
          </div>

          {/* Time range selector */}
          <div className="flex items-center space-x-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Clock className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 ml-2 mr-1" />
            {(["all", "5min", "15min", "30min"] as const).map((range) => (
              <motion.button
                key={range}
                onClick={() => setTimeRange(range)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  timeRange === range
                    ? `text-white shadow-sm`
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                style={{
                  backgroundColor: timeRange === range ? actualColor : "transparent",
                }}
              >
                {range === "all" ? "All" : range === "5min" ? "5m" : range === "15min" ? "15m" : "30m"}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 divide-x divide-gray-100 dark:divide-gray-700 border-b border-gray-100 dark:border-gray-700">
        <div className="p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {stats.current} <span className="text-xs font-normal text-gray-500">{paramInfo.unit}</span>
          </p>
        </div>
        <div className="p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Average</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {stats.avg} <span className="text-xs font-normal text-gray-500">{paramInfo.unit}</span>
          </p>
        </div>
        <div className="p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Min</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {stats.min} <span className="text-xs font-normal text-gray-500">{paramInfo.unit}</span>
          </p>
        </div>
        <div className="p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Max</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {stats.max} <span className="text-xs font-normal text-gray-500">{paramInfo.unit}</span>
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-5">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`colorGradient-${parameter}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={paramInfo.gradientStart} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={paramInfo.gradientEnd} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(107, 114, 128, 0.2)" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatXAxis}
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={{ stroke: "rgba(156, 163, 175, 0.2)" }}
                tickLine={{ stroke: "rgba(156, 163, 175, 0.2)" }}
              />
              <YAxis
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={{ stroke: "rgba(156, 163, 175, 0.2)" }}
                tickLine={{ stroke: "rgba(156, 163, 175, 0.2)" }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={getThresholdValue()}
                stroke="#EF4444"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                label={{
                  value: "Threshold",
                  position: "insideTopRight",
                  fill: "#EF4444",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey={parameter}
                stroke={actualColor}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#colorGradient-${parameter})`}
                activeDot={{
                  r: 6,
                  stroke: actualColor,
                  strokeWidth: 2,
                  fill: "white",
                  strokeOpacity: 0.8,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">{data.length} data points</span>
        <motion.button
          whileHover={{ x: 3 }}
          className="text-xs font-medium flex items-center text-[color] hover:underline"
          style={{ color: actualColor }}
        >
          View detailed analysis <ArrowRight className="ml-1 h-3 w-3" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ParameterChart
