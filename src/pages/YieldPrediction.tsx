import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import ContentHeader from "@/components/layout/ContentHeader";
import ProductDonutChart from "@/components/charts/ProductDonutChart";
import {
  blendSummary,
  refineryInfo,
} from "@/data/yield";

export default function YieldPrediction() {
  const [temperature, setTemperature] = useState(350);
  const [pressure, setPressure] = useState(20);
  const [feedRate, setFeedRate] = useState(100);
  const [catalyst, setCatalyst] = useState(80);

  const [predictedYield, setPredictedYield] = useState(() => {
    return Number(localStorage.getItem("predictedYield")) || 85;
  });

  const [confidence, setConfidence] = useState(() => {
    return Number(localStorage.getItem("confidence")) || 92;
  });

  const [efficiency, setEfficiency] = useState(() => {
    return Number(localStorage.getItem("efficiency")) || 88;
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <ContentHeader
        icon={<BarChart3 size={24} />}
        iconBg="bg-navy-900"
        title="Yield Prediction"
        subtitle="Predict product yield distribution based on crude properties, blend composition and refinery configuration using AI/ML models."
      />
      

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">
          Process Parameters
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-600">
              Temperature (°C)
            </label>
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Pressure (bar)
            </label>
            <input
              type="number"
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Feed Rate
            </label>
            <input
              type="number"
              value={feedRate}
              onChange={(e) => setFeedRate(Number(e.target.value))}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Catalyst Activity
            </label>
            <input
              type="number"
              value={catalyst}
              onChange={(e) => setCatalyst(Number(e.target.value))}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
        </div>

        <button
          onClick={() => {
            const calculatedYield = Number(
              (
                40 +
                temperature * 0.05 +
                pressure * 0.4 +
                feedRate * 0.08 +
                catalyst * 0.12
              ).toFixed(1)
            );

            const finalYield = Math.min(
              95,
              Math.max(35, calculatedYield)
            );

            const newYield = Number(finalYield.toFixed(1));

            const newConfidence = Number(
              (70 + catalyst / 5).toFixed(1)
            );

            const newEfficiency = Number(
              (finalYield * 0.95).toFixed(1)
            );

            setPredictedYield(newYield);
            setConfidence(newConfidence);
            setEfficiency(newEfficiency);

            localStorage.setItem(
              "predictedYield",
              newYield.toString()
            );

            localStorage.setItem(
              "confidence",
              newConfidence.toString()
            );

            localStorage.setItem(
              "efficiency",
              newEfficiency.toString()
            );
          }}
          className="mt-4 px-5 py-2 rounded-lg bg-orange-500 text-white"
        >
          Predict Yield
        </button>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Yield
            </p>
            <p className="text-xl font-bold">
              {predictedYield}%
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Confidence
            </p>
            <p className="text-xl font-bold">
              {confidence}%
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Efficiency
            </p>
            <p className="text-xl font-bold">
              {efficiency}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <BarChart3 size={16} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white">
                Predicted Product Distribution
              </h3>
              <p className="text-xs text-gray-400">
                AI/ML model prediction based on inputs
              </p>
            </div>
          </div>

          <div className="h-[280px]">
            <ProductDonutChart
              data={[
                {
                  name: "Yield",
                  value: predictedYield,
                  color: "#10B981",
                },
                {
                  name: "Remaining",
                  value: 100 - predictedYield,
                  color: "#E5E7EB",
                },
              ]}
              centerText={`${predictedYield}%`}
              centerSubtext="Predicted Yield"
            />
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-2">
            {[
              {
                name: "Yield",
                value: predictedYield,
                color: "#10B981",
              },
              {
                name: "Remaining",
                value: 100 - predictedYield,
                color: "#E5E7EB",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-600">
                  {item.name}
                </span>
                <span className="text-xs font-medium text-gray-900 dark:text-white dark:text-white">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Input Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart3 size={16} className="text-gray-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white">
              Input Summary
            </h3>
          </div>

          <div className="space-y-4 mb-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">
              Blend Composition
            </h4>

            {blendSummary.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between py-2 border-b border-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">
                    {item.name}
                  </span>
                </div>

                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Total Blend
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">
                100%
              </span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400">
                Refinery
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">
                {refineryInfo.name}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}