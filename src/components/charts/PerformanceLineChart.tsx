import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceDataPoint {
  day: string;
  grm: number;
  yield: number;
}

interface PerformanceLineChartProps {
  data: PerformanceDataPoint[];
}

export default function PerformanceLineChart({ data }: PerformanceLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }} />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        <Line yAxisId="left" type="monotone" dataKey="grm" name="GRM (₹/bbl)" stroke="#E87722" strokeWidth={2} dot={{ r: 4 }} animationDuration={800} />
        <Line yAxisId="right" type="monotone" dataKey="yield" name="Yield (%)" stroke="#2563EB" strokeWidth={2} dot={{ r: 4 }} animationDuration={800} />
      </LineChart>
    </ResponsiveContainer>
  );
}
