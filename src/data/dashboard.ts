export const kpiData = [
  {
    id: 'grm-today',
    label: 'GRM (Today)',
    value: '\u20b931.04',
    unit: '/bbl',
    iconColor: 'bg-green-500',
    iconType: 'rupee',
    trend: 8.35,
    trendLabel: 'vs Yesterday',
  },
  {
    id: 'brent',
    label: 'Brent Crude',
    value: '$82.41',
    unit: '/bbl',
    iconColor: 'bg-green-500',
    iconType: 'drop',
    trend: 1.42,
    trendLabel: '',
  },
  {
    id: 'total-yield',
    label: 'Total Yield',
    value: '92.5',
    unit: '%',
    iconColor: 'bg-blue-500',
    iconType: 'barrel',
    trend: 0,
    trendLabel: '',
  },
  {
    id: 'grm-margin',
    label: 'Gross Refining Margin',
    value: '\u20b931.04',
    unit: 'Lakh/day',
    iconColor: 'bg-orange-500',
    iconType: 'dollar',
    trend: 8.35,
    trendLabel: 'vs Yesterday',
  },
];

export const yieldTrendData = [
  { time: '00:00', yield: 88.5 },
  { time: '02:00', yield: 89.2 },
  { time: '04:00', yield: 90.1 },
  { time: '06:00', yield: 89.8 },
  { time: '08:00', yield: 91.2 },
  { time: '10:00', yield: 91.5 },
  { time: '12:00', yield: 92.1 },
  { time: '14:00', yield: 92.3 },
  { time: '16:00', yield: 92.5 },
  { time: '18:00', yield: 91.8 },
  { time: '20:00', yield: 91.2 },
  { time: '22:00', yield: 90.5 },
];

export const temperatureYieldData = [
  { temp: 30, yield: 32 },
  { temp: 32, yield: 33 },
  { temp: 34, yield: 35 },
  { temp: 36, yield: 36 },
  { temp: 38, yield: 34 },
  { temp: 40, yield: 31 },
];

export const productDistributionData = [
  { name: 'Diesel', value: 40, color: '#2563EB' },
  { name: 'Gasoline', value: 35, color: '#10B981' },
  { name: 'Kerosene', value: 10, color: '#F59E0B' },
  { name: 'LPG', value: 8, color: '#8B5CF6' },
  { name: 'Fuel Oil', value: 7, color: '#EF4444' },
];
