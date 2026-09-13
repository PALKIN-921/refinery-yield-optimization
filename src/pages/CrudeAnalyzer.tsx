import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Info, CheckCircle } from 'lucide-react';
import ContentHeader from '@/components/layout/ContentHeader';
import QualityGauge from '@/components/charts/QualityGauge';
import { crudeProperties } from '@/data/crude';
import { Button } from '@/components/ui/button';

type Detail = {
  parameter: string;
  value: string;
  rating: string;
};

export default function CrudeAnalyzer() {
  const [api, setApi] = useState(
    () => localStorage.getItem("api") || String(crudeProperties.api)
  );

  const [sulfur, setSulfur] = useState(
    () => localStorage.getItem("sulfur") || String(crudeProperties.sulfurContent)
  );

  const [tan, setTan] = useState(
    () => localStorage.getItem("tan") || String(crudeProperties.tan)
  );

  const [qualityScore, setQualityScore] = useState(
    () => Number(localStorage.getItem("qualityScore")) || 82
  );

  const [rating, setRating] = useState(
    () => localStorage.getItem("rating") || "Good"
  );

  const [difficulty, setDifficulty] = useState(
    () => localStorage.getItem("difficulty") || "Medium"
  );

  const [refinery, setRefinery] = useState(
    () => localStorage.getItem("refinery") || "Panipat Refinery"
  );

  const [details, setDetails] = useState<Detail[]>(() => {
    const saved = localStorage.getItem("details");
    return saved
      ? JSON.parse(saved)
      : [
          {
            parameter: "API Gravity",
            value: `${api}°`,
            rating: "Good",
          },
          {
            parameter: "Sulfur Content",
            value: `${sulfur}%`,
            rating: "Moderate",
          },
          {
            parameter: "TAN",
            value: `${tan} mg KOH/g`,
            rating: "Low",
          },
        ];
  });

  const [showResults, setShowResults] = useState(
    () => localStorage.getItem("showResults") === "true"
  );

useEffect(() => {
localStorage.setItem("api", api);
localStorage.setItem("sulfur", sulfur);
localStorage.setItem("tan", tan);

localStorage.setItem("qualityScore", String(qualityScore));
localStorage.setItem("rating", rating);
localStorage.setItem("difficulty", difficulty);
localStorage.setItem("refinery", refinery);
localStorage.setItem("details", JSON.stringify(details));
localStorage.setItem("showResults", String(showResults));
}, [
  api,
  sulfur,
  tan,
  qualityScore,
  rating,
  difficulty,
  refinery,
  showResults,
  details,
]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ContentHeader
        icon={<FlaskConical size={24} />}
        iconBg="bg-navy-900"
        title="Crude Analyzer"
        subtitle="Analyze crude oil properties and get quality assessment, processing difficulty and best refinery recommendation."
        action={{ label: 'Analysis Results', onClick: () => setShowResults(!showResults), variant: 'outline' }}
      />

      <div className="grid grid-cols-2 gap-6">
        {/* Quality Score Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white mb-2">Crude Quality Score</h3>
          <div className="h-[220px] flex items-center justify-center">
            <QualityGauge score={qualityScore} />
          </div>
          <div className="text-center mt-2">
            <span className="text-2xl font-bold text-green-600">{qualityScore}</span>
            <span className="ml-2 text-sm font-medium text-green-600">{rating}</span>
          </div>
        </motion.div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white">Input Crude Properties</h3>
          </div>
          <p className="text-xs text-gray-400 mb-6">Enter crude oil characteristics for analysis.</p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-36 shrink-0">API (°)</label>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  value={api}
                  onChange={(e) => setApi(e.target.value)}
                  className="flex-1 border-b-2 border-gray-200 focus:border-orange-500 outline-none py-2 text-gray-900 dark:text-white dark:text-white transition-colors"
                />
                <span className="text-xs text-gray-400">°API</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-36 shrink-0">Sulfur Content (% wt)</label>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  value={sulfur}
                  onChange={(e) => setSulfur(e.target.value)}
                  className="flex-1 border-b-2 border-gray-200 focus:border-orange-500 outline-none py-2 text-gray-900 dark:text-white dark:text-white transition-colors"
                />
                <span className="text-xs text-gray-400">%</span>
                <Info size={14} className="text-gray-300" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 w-36 shrink-0">TAN (mg KOH/g)</label>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  value={tan}
                  onChange={(e) => setTan(e.target.value)}
                  className="flex-1 border-b-2 border-gray-200 focus:border-orange-500 outline-none py-2 text-gray-900 dark:text-white dark:text-white transition-colors"
                />
                <span className="text-xs text-gray-400">mg KOH/g</span>
                <Info size={14} className="text-gray-300" />
              </div>
            </div>
          </div>

          <Button
            className="mt-6 bg-green-500 hover:bg-green-600"
            onClick={() => {
              const apiVal = Number(api);
              const sulfurVal = Number(sulfur);
              const tanVal = Number(tan);

              let score =
                apiVal * 2.2 -
                sulfurVal * 12 -
                tanVal * 8;

              score = Math.max(20, Math.min(100, score));

              const finalScore = Number(score.toFixed(0));

              setQualityScore(finalScore);

              if (finalScore >= 80) {
                setRating("Excellent");
                setDifficulty("Low");
                setRefinery("Panipat Refinery");
              } else if (finalScore >= 60) {
                setRating("Good");
                setDifficulty("Medium");
                setRefinery("Paradip Refinery");
              } else {
                setRating("Poor");
                setDifficulty("High");
                setRefinery("Gujarat Refinery");
              }
              setDetails([
                {
                  parameter: "API Gravity",
                  value: `${apiVal}°`,
                  rating: apiVal > 35 ? "Good" : apiVal > 25 ? "Moderate" : "Poor",
                },
                {
                  parameter: "Sulfur Content",
                  value: `${sulfurVal}%`,
                  rating: sulfurVal < 1 ? "Good" : sulfurVal < 3 ? "Moderate" : "Poor",
                },
                {
                  parameter: "TAN",
                  value: `${tanVal} mg KOH/g`,
                  rating: tanVal < 1 ? "Good" : tanVal < 2 ? "Moderate" : "Poor",
                },
              ]);

              localStorage.setItem(
                "qualityScore",
                finalScore.toString()
              );

              setShowResults(true);
            }}
          >
            Analyze
          </Button>
        </motion.div>
      </div>

      {/* Analysis Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 overflow-hidden"
          >
            <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white mb-4">Analysis Results</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400">Processing Difficulty</p>
                <p className="text-lg font-semibold text-amber-600">{difficulty}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400">Best Refinery</p>
                <p className="text-lg font-semibold text-blue-600">{refinery}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400">Overall Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-green-600">{rating}</p>
                  <CheckCircle size={18} className="text-green-500" />
                </div>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-2">Parameter</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-2">Value</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-2">Rating</th>
                </tr>
              </thead>
              <tbody>
                {details.map((detail, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white dark:text-white">{detail.parameter}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{detail.value}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${detail.rating === 'Good' ? 'text-green-600' : detail.rating === 'Moderate' ? 'text-amber-600' : 'text-blue-600'}`}>
                        {detail.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
