import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardProps {
  icon: React.ReactNode;
  iconBg: string;
  value: string;
  unit: string;
  label: string;
  trend?: number;
  trendLabel?: string;
  delay?: number;
}

export default function KpiCard({ icon, iconBg, value, unit, label, trend = 0, trendLabel = '', delay = 0 }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5"
    >
      <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center text-white mb-3`}>
        {icon}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">{value}</span>
        <span className="text-sm text-gray-400">{unit}</span>
      </div>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
      {trend !== 0 && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{trend > 0 ? '+' : ''}{trend}%</span>
          {trendLabel && <span className="text-gray-400 font-normal">{trendLabel}</span>}
        </div>
      )}
      {trend === 0 && (
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
          <Minus size={14} />
          <span>No change</span>
        </div>
      )}
    </motion.div>
  );
}
