import { motion } from 'framer-motion';
import { Box, Thermometer, Droplet, FlaskConical, CheckCircle } from 'lucide-react';
import ContentHeader from '@/components/layout/ContentHeader';
import { digitalTwinMetrics } from '@/data/future';

export default function FutureModule() {
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'thermometer': return <Thermometer size={18} />;
      case 'droplet': return <Droplet size={18} />;
      case 'flask-conical': return <FlaskConical size={18} />;
      default: return <Box size={18} />;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ContentHeader
        icon={<Box size={24} />}
        iconBg="bg-navy-900"
        title="Future Module"
        subtitle="Digital Twin — Real-time 3D visualization of refinery operations for monitoring, simulation and decision support."
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-4">
        {digitalTwinMetrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${metric.iconColor} rounded-full flex items-center justify-center text-white`}>
                {getIcon(metric.icon)}
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white mt-1">{metric.value}</p>
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle size={14} className={metric.statusColor} />
              <span className={`text-xs ${metric.statusColor}`}>{metric.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3D Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Box size={18} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white">3D Refinery Visualization</h3>
            </div>
          </div>
          <div className="flex gap-2">
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none">
              <option>View</option>
            </select>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none">
              <option>All Units</option>
            </select>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none">
              <option>Real-time</option>
            </select>
          </div>
        </div>

        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <img
            src="/digital-twin-refinery.jpg"
            alt="3D Refinery Visualization"
            className="w-full h-full object-cover"
          />
          {/* Unit Labels */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-[35%] left-[15%] bg-black/80 text-green-400 px-3 py-2 rounded-lg text-sm font-mono"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              CDU 360°C
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute top-[25%] right-[25%] bg-black/80 text-green-400 px-3 py-2 rounded-lg text-sm font-mono"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              VDU 385°C
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
