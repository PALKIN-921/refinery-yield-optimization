export const scenarioA = {
  name: 'Scenario A',
  focus: 'High Yield Focus',
  description: 'Focus on maximizing product yields within IOCL operating constraints.',
  metrics: {
    netProfit: 245.60,
    grm: 6.20,
    totalYield: 91.30,
    compliance: 98.20,
  },
};

export const scenarioComparison = [
  { parameter: 'Net Profit (₹ Crore)', scenarioA: 245.60, scenarioB: 260.40, scenarioC: 278.90 },
  { parameter: 'GRM (₹ / BBL)', scenarioA: 6.20, scenarioB: 6.45, scenarioC: 6.85 },
  { parameter: 'Total Yield (%)', scenarioA: 91.30, scenarioB: 90.20, scenarioC: 88.50 },
  { parameter: 'Compliance Grade', scenarioA: 'A', scenarioB: 'B', scenarioC: 'C' },
];

export const scenarios = [
  { name: 'Scenario A', focus: 'High Yield', netProfit: 245.60, grm: 6.20, totalYield: 91.30, compliance: 'A' },
  { name: 'Scenario B', focus: 'Balanced', netProfit: 260.40, grm: 6.45, totalYield: 90.20, compliance: 'B' },
  { name: 'Scenario C', focus: 'Max Profit', netProfit: 278.90, grm: 6.85, totalYield: 88.50, compliance: 'C' },
];
