export const alertStats = [
  { severity: 'Critical', count: 8, icon: 'alert-triangle', color: 'red', description: 'Requires Immediate Action' },
  { severity: 'Warning', count: 15, icon: 'alert-triangle', color: 'amber', description: 'Needs Attention' },
  { severity: 'Information', count: 23, icon: 'info', color: 'blue', description: 'For Your Information' },
];

export const alertsData = [
  {
    id: 'ALT-250526-001',
    severity: 'Critical',
    unit: 'FCCU',
    message: 'High temperature in regenerator exceeds limit (750°C)',
    triggered: '26 May 10:15',
    acknowledged: false,
  },
  {
    id: 'ALT-250526-002',
    severity: 'Warning',
    unit: 'VDU',
    message: 'Pressure deviation in overhead system (12% above set point)',
    triggered: '26 May 10:05',
    acknowledged: false,
  },
  {
    id: 'ALT-250526-003',
    severity: 'Information',
    unit: 'CDU',
    message: 'Unit performance is within normal range',
    triggered: '26 May 09:55',
    acknowledged: true,
  },
  {
    id: 'ALT-250526-004',
    severity: 'Critical',
    unit: 'HDT',
    message: 'Catalyst bed temperature rising rapidly',
    triggered: '26 May 09:45',
    acknowledged: false,
  },
  {
    id: 'ALT-250526-005',
    severity: 'Warning',
    unit: 'SRU',
    message: 'Sulfur recovery below target (94%)',
    triggered: '26 May 09:30',
    acknowledged: false,
  },
];
