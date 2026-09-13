interface StatusBadgeProps {
  text: string;
  variant: 'critical' | 'warning' | 'info' | 'success' | 'blue' | 'green' | 'purple' | 'amber' | 'red';
}

const variantStyles: Record<string, string> = {
  critical: 'bg-red-500 text-white',
  warning: 'bg-amber-500 text-white',
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  purple: 'bg-purple-100 text-purple-700',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
};

export default function StatusBadge({ text, variant }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variantStyles[variant]}`}>
      {text}
    </span>
  );
}
