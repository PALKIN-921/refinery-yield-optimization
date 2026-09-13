import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ContentHeaderProps {
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  subtitle: string;
  action?: {
    label: string;
    onClick?: () => void;
    variant?: 'default' | 'outline';
  };
}

export default function ContentHeader({ icon, iconBg = 'bg-navy-900', title, subtitle, action }: ContentHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 flex items-start justify-between"
    >
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">{title}</h1>
          <p className="text-sm text-gray-400 mt-1 max-w-xl">{subtitle}</p>
        </div>
      </div>
      {action && (
        <Button
          variant={action.variant || 'default'}
          className={action.variant === 'outline' ? '' : 'bg-orange-500 hover:bg-orange-600'}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}
