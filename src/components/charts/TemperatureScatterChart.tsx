import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TemperatureScatterChartProps {
  data: { temp: number; yield: number }[];
}

export default function TemperatureScatterChart({ data }: TemperatureScatterChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="temp" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} label={{ value: 'Temp (°C)', position: 'insideBottom', offset: -5, style: { fontSize: 11, fill: '#94a3b8' } }} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} label={{ value: 'Yield (%)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#94a3b8' } }} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }} />
        <ReferenceLine y={33} stroke="#E87722" strokeDasharray="5 5" label={{ value: 'Optimal 33%', position: 'right', fill: '#E87722', fontSize: 11 }} />
        <Line type="monotone" dataKey="yield" stroke="#E87722" strokeWidth={2} dot={{ fill: '#E87722', r: 4 }} activeDot={{ r: 6 }} animationDuration={800} />
      </LineChart>
    </ResponsiveContainer>
  );
}
