import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Upload, CheckCircle, Search, FileBarChart, CalendarClock, TrendingUp, Activity, GitMerge } from 'lucide-react';
import ContentHeader from '@/components/layout/ContentHeader';
import StatusBadge from '@/components/shared/StatusBadge';
import { datasetStats, datasetsData } from '@/data/datasets';

const getIcon = (iconName: string) => {
  switch(iconName) {
    case 'file-bar-chart': return <FileBarChart size={16} />;
    case 'calendar-clock': return <CalendarClock size={16} />;
    case 'trending-up': return <TrendingUp size={16} />;
    case 'activity': return <Activity size={16} />;
    case 'git-merge': return <GitMerge size={16} />;
    default: return <FileBarChart size={16} />;
  }
};

export default function DataManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDatasets = datasetsData.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ContentHeader
        icon={<Database size={24} />}
        iconBg="bg-navy-900"
        title="Data Management"
        subtitle="Manage, upload and validate all refinery datasets."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {datasetStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5 flex items-center gap-4"
          >
            <div className={`w-14 h-14 ${stat.iconColor} rounded-full flex items-center justify-center text-white`}>
              {idx === 0 ? <Database size={24} /> : <FileBarChart size={24} />}
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.sublabel}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 flex items-center gap-3 flex-wrap"
      >
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-500 border-b-2 border-orange-500">
          <Database size={14} />
          Dataset Overview
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-300 hover:text-gray-700">
          <Upload size={14} />
          Upload Dataset
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-300 hover:text-gray-700">
          <CheckCircle size={14} />
          Data Validation
        </button>
        <div className="ml-auto relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search datasets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
          />
        </div>
      </motion.div>

      {/* Dataset Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-6 py-3">Dataset Name</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-6 py-3">Category</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-6 py-3">Records</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-6 py-3">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredDatasets.map((dataset, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                        {getIcon(dataset.icon)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">{dataset.name}</p>
                        <p className="text-xs text-gray-400">{dataset.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge text={dataset.category} variant={
                      dataset.category === 'Crude Data' ? 'blue' :
                      dataset.category === 'Historical Data' ? 'green' :
                      dataset.category === 'Market Data' ? 'purple' :
                      dataset.category === 'Sensor Data' ? 'amber' : 'red'
                    } />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{dataset.records}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{dataset.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
