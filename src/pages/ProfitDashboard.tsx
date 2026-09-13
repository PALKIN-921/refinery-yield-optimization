import { motion } from 'framer-motion';
import { Wallet, IndianRupee, TrendingDown } from 'lucide-react';
import ContentHeader from '@/components/layout/ContentHeader';
import KpiCard from '@/components/shared/KpiCard';
import ProfitBarChart from '@/components/charts/ProfitBarChart';
import { profitKpis, profitComparisonData } from '@/data/profit';

export default function ProfitDashboard() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ContentHeader
        icon={<Wallet size={24} />}
        iconBg="bg-navy-900"
        title="Profit Dashboard"
        subtitle="Track financial performance and profitability impact before and after optimization as per IOCL standards."
      />

      {/* Revenue + Cost KPIs */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <KpiCard
            icon={<IndianRupee size={18} />}
            iconBg="bg-green-500"
            value={profitKpis[0].value}
            unit={profitKpis[0].unit}
            label={profitKpis[0].label}
            trend={profitKpis[0].trend}
            trendLabel={profitKpis[0].trendLabel}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <KpiCard
            icon={<TrendingDown size={18} />}
            iconBg="bg-red-500"
            value={profitKpis[1].value}
            unit={profitKpis[1].unit}
            label={profitKpis[1].label}
            trend={profitKpis[1].trend}
            trendLabel={profitKpis[1].trendLabel}
          />
        </motion.div>
      </div>

      {/* Before Optimization Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
      >
        <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white mb-4">Before Optimization</h3>
        <div className="h-[320px]">
          <ProfitBarChart data={profitComparisonData} />
        </div>
      </motion.div>
    </motion.div>
  );
}
