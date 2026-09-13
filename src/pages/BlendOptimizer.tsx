import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Check } from 'lucide-react';
import ContentHeader from '@/components/layout/ContentHeader';
import ProductDonutChart from '@/components/charts/ProductDonutChart';
import { blendCompositionData } from '@/data/blend';

export default function BlendOptimizer() {
  const [composition, setComposition] = useState(
    blendCompositionData.map(c => ({
      ...c,
      proportion: c.available
    }))
  );
  const [optimizedBlend, setOptimizedBlend] = useState(
    blendCompositionData.map(c => ({
      ...c,
      proportion: c.available
    }))
  );
  const [results, setResults] = useState({
    totalCost: 0,
    estimatedProfit: 0,
    qualityScore: 0,
    status: "Waiting"
  });

  const handleOptimize = () => {

    const totalAvailable = composition.reduce(
      (sum, item) => sum + item.available,
      0
    );

    if (totalAvailable === 0) {
      alert("Please enter crude availability.");
      return;
    }

    // Cheapest crude first
    let sorted = [...composition].sort((a, b) => a.cost - b.cost);

    let remaining = 100;

    const optimized = sorted.map((item, index) => {

      let allocation = 0;

      if (index === 0) allocation = Math.min(item.available, 40);
      else if (index === 1) allocation = Math.min(item.available, 30);
      else if (index === 2) allocation = Math.min(item.available, 20);
      else allocation = Math.min(item.available, remaining);

      remaining -= allocation;

      return {
        ...item,
        proportion: allocation
      };
    });

    // Agar total 100 nahi bana to cheapest crude me add kar do
    if (remaining > 0) {
      optimized[0].proportion += remaining;
    }

    // Cost
    const totalCost =
      optimized.reduce(
        (sum, item) => sum + item.proportion * item.cost,
        0
      ) / 100;

    // Profit
    const estimatedProfit = (82 - totalCost) * 100000;

    // Quality
    const qualityScore = Math.max(
      80,
      Math.min(99, 100 - (totalCost - 65))
    );

    const finalBlend = composition.map((original) =>
      optimized.find(
        (item) => item.crudeType === original.crudeType
      )!
    );

    setOptimizedBlend(finalBlend);

    setResults({
      totalCost,
      estimatedProfit,
      qualityScore,
      status: "Optimized Successfully"
    });

  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ContentHeader
        icon={<FlaskConical size={24} />}
        iconBg="bg-navy-900"
        title="Blend Optimizer"
        subtitle="Optimize crude blend composition to maximize profit while meeting IOCL refining constraints and product specifications."
        action={{ label: 'Optimize', onClick: handleOptimize }}
      />

      {/* Composition Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white">Input: Crude Composition</h3>
        </div>
        <p className="text-xs text-gray-400 mb-6">Enter available crudes and their proportions.</p>
        <div className="mb-5">
          {composition.reduce((sum, item) => sum + item.available, 0) === 100 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm">
              ✅ Total Input: 100% (Ready for Optimization)
            </div>
          ) : (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-orange-700 text-sm">
              ⚠ Total Input: {composition.reduce((sum, item) => sum + item.available, 0)}%
              <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                System will normalize blend during optimization.
              </div>
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Crude Type</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Available (%)</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Cost ($/BBL)</th>
              </tr>
            </thead>
            <tbody>
              {composition.map((row, idx) => (
                <tr key={idx} className={`border-b border-gray-100 ${row.colorClass} border-l-4`}>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">{row.crudeType}</span>
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={row.available}
                      onChange={(e) => {
                        const newComp = [...composition];
                        newComp[idx].available = Number(e.target.value);
                        setComposition(newComp);
                      }}
                      className="w-20 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{row.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Best Blend Donut */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white">
              Optimized Blend
            </h3>
            <p className="text-xs text-gray-400">
              Recommended blend after optimization
            </p>
          </div>

          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Check size={18} className="text-green-600" />
          </div>
        </div>

        <div className="h-[240px]">
          <ProductDonutChart
            data={optimizedBlend.map((item) => ({
              name: item.crudeType,
              value: item.proportion,
              color: item.color,
            }))}
            centerText="100%"
            centerSubtext="Optimized Blend"
          />
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white dark:text-white mb-3">
            Optimized Blend Results
          </h4>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-sm text-gray-500 dark:text-gray-300">
                  Crude
                </th>

                <th className="text-right py-2 text-sm text-gray-500 dark:text-gray-300">
                  Optimized %
                </th>
              </tr>
            </thead>

            <tbody>
              {optimizedBlend.map((item) => (
                <tr key={item.crudeType} className="border-b">
                  <td className="py-3">
                    {item.crudeType}
                  </td>

                  <td className="text-right font-semibold">
                    {item.proportion}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5">
    <p className="text-gray-500 dark:text-gray-300 text-sm">Total Cost</p>
    <h2 className="text-2xl font-bold">
      ${results.totalCost.toFixed(2)}
    </h2>
  </div>

  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5">
    <p className="text-gray-500 dark:text-gray-300 text-sm">Estimated Profit</p>
    <h2 className="text-2xl font-bold text-green-600">
      ${results.estimatedProfit.toLocaleString()}
    </h2>
  </div>

  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5">
    <p className="text-gray-500 dark:text-gray-300 text-sm">Quality Score</p>
    <h2 className="text-2xl font-bold text-blue-600">
      {results.qualityScore.toFixed(1)}%
    </h2>
  </div>

  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5">
    <p className="text-gray-500 dark:text-gray-300 text-sm">Status</p>
    <h2 className="text-lg font-semibold text-green-600">
      {results.status}
    </h2>
  </div>

</div>
    </motion.div>
  );
}
