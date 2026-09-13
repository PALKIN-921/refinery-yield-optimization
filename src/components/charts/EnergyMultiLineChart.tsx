import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EnergyDataPoint {
  time: string;
  steam: number;
  power: number;
  hydrogen: number;
  fuelGas: number;
}

interface EnergyMultiLineChartProps {
  data: EnergyDataPoint[];
}

export default function EnergyMultiLineChart({ data }: EnergyMultiLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} label={{ value: 'Steam (T/hr) / Power (MW) / Fuel Gas (Nm³/hr)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }} />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        <Line type="monotone" dataKey="steam" name="Steam (T/hr)" stroke="#E87722" strokeWidth={2} dot={{ r: 3 }} animationDuration={800} />
        <Line type="monotone" dataKey="power" name="Power (MW)" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} animationDuration={800} />
        <Line type="monotone" dataKey="hydrogen" name="Hydrogen (Nm³/hr)" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} animationDuration={800} />
        <Line type="monotone" dataKey="fuelGas" name="Fuel Gas (Nm³/hr)" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} animationDuration={800} />
      </LineChart>
    </ResponsiveContainer>
  );
}
