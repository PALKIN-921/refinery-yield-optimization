import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BarChart3,
  FlaskConical,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import NavItem from './NavItem';

const navItems = [
  { icon: <Home size={20} />, label: 'Home', path: '/', badge: 0 },
  { icon: <BarChart3 size={20} />, label: 'Dashboard', path: '/dashboard', badge: 0 },
  { icon: <FlaskConical size={20} />, label: 'Crude Analyzer', path: '/crude-analyzer', badge: 0 },
  { icon: <FlaskConical size={20} />, label: 'Blend Optimizer', path: '/blend-optimizer', badge: 0 },
  { icon: <BarChart3 size={20} />, label: 'Yield Prediction', path: '/yield-prediction', badge: 0 },

  // { icon: <SlidersHorizontal size={20} />, label: 'Optimization Dashboard', path: '/optimization', badge: 0 },
  // { icon: <Wallet size={20} />, label: 'Profit Dashboard', path: '/profit', badge: 0 },
  // { icon: <FlaskConical size={20} />, label: 'Scenario Analysis', path: '/scenario', badge: 0 },
  // { icon: <Box size={20} />, label: 'Future Module', path: '/future', badge: 0 },
  // { icon: <Zap size={20} />, label: 'Energy & Utilities', path: '/energy', badge: 0 },
  // { icon: <FileText size={20} />, label: 'Reports', path: '/reports', badge: 0 },
  // { icon: <Bell size={20} />, label: 'Alerts', path: '/alerts', badge: 3 },
  // { icon: <Database size={20} />, label: 'Data Management', path: '/data', badge: 0 },

  { icon: <Settings size={20} />, label: 'Settings', path: '/settings', badge: 0 },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      className="fixed left-0 top-0 h-full bg-navy-900 flex flex-col z-50"
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs">IO</span>
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <h2 className="text-white font-semibold text-sm leading-tight">
                Indian Oil
              </h2>
              <p className="text-white/50 text-[10px]">
                The Energy of India
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brand Section */}
      <div className="px-4 py-4 border-b border-white/10">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-white font-bold text-lg tracking-wide">
                RYOOT
              </h1>

              <p className="text-white/50 text-[11px] leading-tight mt-0.5">
                Refinery Yield
                <br />
                Optimization Tool
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {collapsed && (
          <div className="text-center text-orange-500 font-bold text-lg">
            R
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1 scrollbar-thin">
        {navItems.map((item) => (
          <div key={item.path}>
            {collapsed ? (
              <button
                onClick={() => {
                  window.location.href = item.path;
                }}
                className="w-full flex justify-center py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-navy-800 transition-colors relative"
                title={item.label}
              >
                {item.icon}

                {item.badge > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            ) : (
              <NavItem
                icon={item.icon}
                label={item.label}
                path={item.path}
                badge={item.badge || undefined}
              />
            )}
          </div>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-orange-600 transition-colors z-10"
      >
        {collapsed ? (
          <ChevronRight size={14} />
        ) : (
          <ChevronLeft size={14} />
        )}
      </button>
    </motion.aside>
  );
}