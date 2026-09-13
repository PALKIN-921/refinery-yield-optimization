import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: number;
}

export default function NavItem({ icon, label, path, badge }: NavItemProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <motion.button
      onClick={() => navigate(path)}
      className={`
        relative flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium
        transition-colors duration-150 cursor-pointer
        ${isActive 
          ? 'bg-orange-500 text-white' 
          : 'text-white/70 hover:text-white hover:bg-navy-800'
        }
      `}
      whileHover={{ x: isActive ? 0 : 2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative">
        {icon}
        {badge && badge > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 h-4 min-w-4 px-1 text-[10px] bg-red-500 text-white border-0 flex items-center justify-center"
          >
            {badge}
          </Badge>
        )}
      </span>
      <span className="truncate">{label}</span>
    </motion.button>
  );
}
