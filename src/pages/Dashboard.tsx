import { motion } from 'framer-motion';
import { BarChart3, DollarSign, Droplet, TrendingUp } from 'lucide-react';
import ContentHeader from '@/components/layout/ContentHeader';
import KpiCard from '@/components/shared/KpiCard';
import ProductDonutChart from '@/components/charts/ProductDonutChart';
import YieldAreaChart from '@/components/charts/YieldAreaChart';
import TemperatureScatterChart from '@/components/charts/TemperatureScatterChart';
import { kpiData, yieldTrendData, temperatureYieldData, productDistributionData } from '@/data/dashboard';

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <ContentHeader
        icon={<BarChart3 size={24} />}
        title="Dashboard"
        subtitle="AI Powered | Data Driven | Profit Focused"
      />

      {/* KPI Cards Row */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => (
          <KpiCard
            key={kpi.id}
            icon={kpi.iconType === 'rupee' ? <span className="text-lg">₹</span> : kpi.iconType === 'drop' ? <Droplet size={18} /> : kpi.iconType === 'barrel' ? <BarChart3 size={18} /> : <DollarSign size={18} />}
            iconBg={kpi.iconColor}
            value={kpi.value}
            unit={kpi.unit}
            label={kpi.label}
            trend={kpi.trend}
            trendLabel={kpi.trendLabel}
            delay={idx * 0.1}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white mb-4">Predicted Overall Yield</h3>
          <YieldAreaChart data={yieldTrendData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white mb-4">Yield vs Temperature</h3>
          <TemperatureScatterChart data={temperatureYieldData} />
        </motion.div>
      </div>

      {/* Yield Prediction + Donut Row */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white">Yield Prediction</h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>This Run</option>
              <option>Previous Run</option>
              <option>Baseline</option>
            </select>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Predicted Yield</span>
              <span className="text-lg font-bold text-blue-600">92.5%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Configuration</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">Optimized Blend A</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Confidence</span>
              <span className="text-sm font-medium text-green-600">94.2%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white mb-2">Predicted Product Distribution</h3>
          <div className="h-[280px]">
            <ProductDonutChart
              data={productDistributionData}
              centerText="92.5%"
              centerSubtext="Total"
            />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-2">
            {productDistributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600">{item.name}</span>
                <span className="text-xs font-medium text-gray-900 dark:text-white dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-400 text-center flex items-center justify-center gap-1">
            <TrendingUp size={12} className="text-orange-500" />
            Optimized as per IOC product yield & value
          </div>
        </motion.div>
      </div>

      <div className="text-xs text-orange-500 text-center">
        Diesel and Gasoline contribute 75% of total yield
      </div>
    </motion.div>
  );
}
