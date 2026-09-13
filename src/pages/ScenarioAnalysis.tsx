import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';
import ContentHeader from '@/components/layout/ContentHeader';
import StatusBadge from '@/components/shared/StatusBadge';
import { scenarioA, scenarioComparison } from '@/data/scenario';

export default function ScenarioAnalysis() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ContentHeader
        icon={<FlaskConical size={24} />}
        iconBg="bg-navy-900"
        title="Scenario Analysis"
        subtitle="Compare multiple operational scenarios to determine the best outcome as per IOCL standards and refinery objectives."
      />

      {/* Scenario A Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <FlaskConical size={18} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white">{scenarioA.name}</h3>
              <StatusBadge text={scenarioA.focus} variant="blue" />
            </div>
            <p className="text-xs text-gray-400 mb-4">{scenarioA.description}</p>

            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400">Net Profit</p>
                <p className="text-lg font-bold text-green-600">₹{scenarioA.metrics.netProfit}</p>
                <p className="text-xs text-gray-400">₹ Crore</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400">GRM</p>
                <p className="text-lg font-bold text-blue-600">₹{scenarioA.metrics.grm}</p>
                <p className="text-xs text-gray-400">/ BBL</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400">Total Yield</p>
                <p className="text-lg font-bold text-blue-600">{scenarioA.metrics.totalYield}%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400">Compliance</p>
                <p className="text-lg font-bold text-green-600">{scenarioA.metrics.compliance}%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scenario Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
      >
        <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white mb-4">Scenario Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Parameter</th>
                <th className="text-center text-xs font-medium text-gray-400 uppercase px-4 py-3">Scenario A<br/><span className="normal-case text-[10px]">(High Yield)</span></th>
                <th className="text-center text-xs font-medium text-gray-400 uppercase px-4 py-3">Scenario B<br/><span className="normal-case text-[10px]">(Balanced)</span></th>
                <th className="text-center text-xs font-medium text-gray-400 uppercase px-4 py-3">Scenario C<br/><span className="normal-case text-[10px]">(Max Profit)</span></th>
                <th className="text-center text-xs font-medium text-gray-400 uppercase px-4 py-3">Best Scenario</th>
              </tr>
            </thead>
            <tbody>
              {scenarioComparison.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white dark:text-white font-medium">{row.parameter}</td>
                  <td className="px-4 py-4 text-sm text-center text-gray-600">{row.scenarioA}</td>
                  <td className="px-4 py-4 text-sm text-center text-gray-600">{row.scenarioB}</td>
                  <td className="px-4 py-4 text-sm text-center text-gray-600">{row.scenarioC}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-xs font-medium ${idx === 0 ? 'text-green-600' : 'text-blue-600'}`}>
                      {idx === 0 ? 'Scenario C' : idx === 1 ? 'Scenario C' : idx === 2 ? 'Scenario A' : 'Scenario A'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
