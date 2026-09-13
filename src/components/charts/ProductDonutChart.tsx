import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ProductDonutChartProps {
  data: { name: string; value: number; color: string }[];
  centerText?: string;
  centerSubtext?: string;
}

export default function ProductDonutChart({ data, centerText, centerSubtext }: ProductDonutChartProps) {
  return (
    <div className="relative w-full h-full min-h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value}%`, '']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '13px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {centerText && <span className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">{centerText}</span>}
        {centerSubtext && <span className="text-xs text-gray-400">{centerSubtext}</span>}
      </div>
    </div>
  );
}
