import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, IndianRupee, TrendingUp, Download } from 'lucide-react';
import ContentHeader from '@/components/layout/ContentHeader';
import ProductDonutChart from '@/components/charts/ProductDonutChart';
import PerformanceLineChart from '@/components/charts/PerformanceLineChart';
import { reportData, yieldDistributionData, keyPerformanceTrend } from '@/data/reports';

const reportTabs = [
  { id: 'daily', label: 'Daily Report', icon: <Calendar size={16} /> },
  { id: 'weekly', label: 'Weekly Report', icon: <Calendar size={16} /> },
  { id: 'monthly', label: 'Monthly Report', icon: <Calendar size={16} /> },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ContentHeader
        icon={<FileText size={24} />}
        iconBg="bg-navy-900"
        title="Reports"
        subtitle="Comprehensive reports and analytics of refinery performance."
      />

      {/* Report Type Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {reportTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? 'text-orange-500' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="report-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
            )}
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5 flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText size={16} className="text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">{reportData.totalYield}%</span>
            </div>
            <p className="text-xs text-gray-400">Total Yield</p>
            <div className="flex items-center gap-1 mt-1 text-green-500 text-xs">
              <TrendingUp size={12} />
              <span>▲ {reportData.yieldTrend}% vs Yesterday</span>
            </div>
          </div>
          <button className="p-2 bg-red-50 rounded-lg">
            <Download size={16} className="text-red-500" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <IndianRupee size={16} className="text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">₹{reportData.grossRefiningMargin}</span>
          </div>
          <p className="text-xs text-gray-400">Gross Refining Margin</p>
          <div className="flex items-center gap-1 mt-1 text-green-500 text-xs">
            <TrendingUp size={12} />
            <span>▲ {reportData.grmTrend}% vs Yesterday</span>
          </div>
        </motion.div>
      </div>

      {/* Daily Report Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
      >
        <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white">Daily Report Summary</h3>
        <p className="text-xs text-gray-400">Report for {reportData.reportDate}</p>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white mb-4">Yield Distribution</h3>
          <div className="h-[250px]">
            <ProductDonutChart data={yieldDistributionData} centerText="92.5%" centerSubtext="Total" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white mb-4">Key Performance Trend</h3>
          <div className="h-[250px]">
            <PerformanceLineChart data={keyPerformanceTrend} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
