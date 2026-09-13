import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Cover() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/cover-refinery.jpg)' }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col justify-center px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-white text-5xl font-bold leading-tight max-w-lg">
            Refinery Yield<br/>Optimization Tool
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-20 h-1 bg-orange-500 mt-6 origin-left"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Enter Dashboard
            <ChevronRight size={18} />
          </button>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-16 flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">IO</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Indian Oil</p>
            <p className="text-white/60 text-xs">The Energy of India</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
