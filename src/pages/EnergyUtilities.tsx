import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Flame, Wind, Droplet } from 'lucide-react';
import ContentHeader from '@/components/layout/ContentHeader';
import KpiCard from '@/components/shared/KpiCard';
import EnergyMultiLineChart from '@/components/charts/EnergyMultiLineChart';
import { energyConsumption, energyTrendData } from '@/data/energy';

const tabs = ['Overview', 'Steam', 'Power', 'Hydrogen', 'Fuel Oil'];

export default function EnergyUtilities() {
  const [activeTab, setActiveTab] = useState('Overview');

  const getIcon = (type: string) => {
    switch(type) {
      case 'flame': return <Flame size={18} />;
      case 'zap': return <Zap size={18} />;
      case 'wind': return <Wind size={18} />;
      case 'droplet': return <Droplet size={18} />;
      default: return <Zap size={18} />;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ContentHeader
        icon={<Zap size={24} />}
        iconBg="bg-navy-900"
        title="Energy & Utilities"
        subtitle="Monitor and optimize refinery energy consumption and utilities performance."
      />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab ? 'text-orange-500' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="energy-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Consumption Cards */}
      <div className="grid grid-cols-4 gap-4">
        {energyConsumption.map((item, idx) => (
          <motion.div
            key={item.utility}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <KpiCard
              icon={getIcon(item.icon)}
              iconBg={item.iconColor}
              value={item.value}
              unit={item.unit}
              label={`${item.utility} Consumption`}
              trend={item.trend}
              trendLabel="vs Yesterday"
            />
            {item.target !== '--' && (
              <div className="mt-2 px-5">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Target: {item.target} {item.unit}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(Number(item.value.replace(',', '')) / Number(item.target.replace(',', ''))) * 100}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Energy Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white">Energy Consumption Trend</h3>
          <span className="text-xs text-gray-400">Last 24 Hours</span>
        </div>
        <div className="h-[300px]">
          <EnergyMultiLineChart data={energyTrendData} />
        </div>
      </motion.div>
    </motion.div>
  );
}
