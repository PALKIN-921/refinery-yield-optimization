import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppShell from '@/components/layout/AppShell';
import Cover from '@/pages/Cover';
import Dashboard from '@/pages/Dashboard';
import CrudeAnalyzer from '@/pages/CrudeAnalyzer';
import BlendOptimizer from '@/pages/BlendOptimizer';
import YieldPrediction from '@/pages/YieldPrediction';
import OptimizationDashboard from '@/pages/OptimizationDashboard';
import ProfitDashboard from '@/pages/ProfitDashboard';
import ScenarioAnalysis from '@/pages/ScenarioAnalysis';
import EnergyUtilities from '@/pages/EnergyUtilities';
import Reports from '@/pages/Reports';
import AlertsCenter from '@/pages/AlertsCenter';
import DataManagement from '@/pages/DataManagement';
import FutureModule from '@/pages/FutureModule';
import Settings from '@/pages/Settings';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crude-analyzer" element={<CrudeAnalyzer />} />
          <Route path="/blend-optimizer" element={<BlendOptimizer />} />
          <Route path="/yield-prediction" element={<YieldPrediction />} />
          <Route path="/optimization" element={<OptimizationDashboard />} />
          <Route path="/profit" element={<ProfitDashboard />} />
          <Route path="/scenario" element={<ScenarioAnalysis />} />
          <Route path="/energy" element={<EnergyUtilities />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/alerts" element={<AlertsCenter />} />
          <Route path="/data" element={<DataManagement />} />
          <Route path="/future" element={<FutureModule />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
