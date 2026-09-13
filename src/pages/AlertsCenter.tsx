import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, ChevronDown, Calendar, CheckSquare } from 'lucide-react';
import ContentHeader from '@/components/layout/ContentHeader';
import StatusBadge from '@/components/shared/StatusBadge';
import { alertStats, alertsData } from '@/data/alerts';

export default function AlertsCenter() {
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);

  const toggleAlert = (id: string) => {
    setSelectedAlerts(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const getSeverityVariant = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'critical';
      case 'Warning': return 'warning';
      case 'Information': return 'info';
      default: return 'info';
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ContentHeader
        icon={<Bell size={24} />}
        iconBg="bg-navy-900"
        title="Alerts Center"
        subtitle="Monitor and manage all refinery alerts and notifications."
      />

      {/* Alert Stats */}
      <div className="grid grid-cols-3 gap-4">
        {alertStats.map((stat, idx) => (
          <motion.div
            key={stat.severity}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5"
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                stat.color === 'red' ? 'bg-red-100' : stat.color === 'amber' ? 'bg-amber-100' : 'bg-blue-100'
              }`}>
                <AlertTriangle size={20} className={
                  stat.color === 'red' ? 'text-red-500' : stat.color === 'amber' ? 'text-amber-500' : 'text-blue-500'
                } />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold" style={{ color: stat.color === 'red' ? '#EF4444' : stat.color === 'amber' ? '#F59E0B' : '#2563EB' }}>
                    {stat.count}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{stat.severity} Alerts</p>
                <p className="text-[10px] text-gray-400">{stat.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 flex gap-3 flex-wrap"
      >
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          <Calendar size={14} />
          26 May 2025 - 26 May 2025
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          All Units
          <ChevronDown size={14} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          All Severity
          <ChevronDown size={14} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          All Status
          <ChevronDown size={14} />
        </button>
        <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
          <CheckSquare size={14} />
          {selectedAlerts.length} selected
        </div>
      </motion.div>

      {/* Alerts Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Alert ID</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Severity</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Unit</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Alert Message</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Triggered</th>
              </tr>
            </thead>
            <tbody>
              {alertsData.map((alert) => (
                <tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedAlerts.includes(alert.id)}
                      onChange={() => toggleAlert(alert.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white dark:text-white">{alert.id}</td>
                  <td className="px-4 py-3">
                    <StatusBadge text={alert.severity} variant={getSeverityVariant(alert.severity)} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{alert.unit}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs">{alert.message}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{alert.triggered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
