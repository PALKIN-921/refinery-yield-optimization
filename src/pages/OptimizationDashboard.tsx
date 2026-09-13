import { motion } from 'framer-motion';
import { SlidersHorizontal, CheckCircle, TrendingUp } from 'lucide-react';
import ContentHeader from '@/components/layout/ContentHeader';
import TemperatureGauge from '@/components/charts/TemperatureGauge';
import { temperatureData, optimizationStatus } from '@/data/optimization';

export default function OptimizationDashboard() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ContentHeader
        icon={<SlidersHorizontal size={24} />}
        iconBg="bg-navy-900"
        title="Optimization Dashboard"
        subtitle="Monitor and optimize key operating parameters to ensure maximum efficiency and product yield as per IOCL standards."
      />

      {/* Temperature Optimization Gauge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
      >
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <SlidersHorizontal size={18} className="text-orange-500" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white">Temperature Optimization</h3>
            <p className="text-xs text-gray-400">Maintain temperature within IOCL recommended operating range.</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 items-center">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Current Temperature</p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-amber-500"
            >
              {temperatureData.currentTemp}°C
            </motion.p>
            <p className="text-xs text-gray-400 mt-1">Measured</p>
          </div>

          <div className="flex justify-center">
            <TemperatureGauge
              value={temperatureData.currentTemp}
              min={temperatureData.minTemp}
              max={temperatureData.maxTemp}
              recommended={temperatureData.recommendedTemp}
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Recommended</p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold text-green-600"
            >
              {temperatureData.recommendedTemp}°C
            </motion.p>
            <p className="text-xs text-gray-400 mt-1">Optimal Setpoint</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
          <p className="text-sm text-green-700">Within IOCL recommended range (320°C - 400°C)</p>
        </div>
      </motion.div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Expected Yield Improvement</p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp size={20} className="text-green-500" />
                <span className="text-3xl font-bold text-green-600">+{optimizationStatus.yieldImprovement}%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Compared to current configuration</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Optimization Status</p>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-3xl font-bold text-green-600">{optimizationStatus.status}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">{optimizationStatus.message}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
