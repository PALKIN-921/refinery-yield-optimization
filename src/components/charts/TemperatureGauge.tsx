import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface TemperatureGaugeProps {
  value: number;
  min: number;
  max: number;
  recommended: number;
}

export default function TemperatureGauge({ value, min, max }: TemperatureGaugeProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const getColor = (val: number) => {
    if (val <= 350) return '#10B981';
    if (val <= 400) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="w-64 h-64 mx-auto">
      <CircularProgressbar
        value={percentage}
        text={`${value}°C`}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: 'round',
          pathTransitionDuration: 1,
          pathColor: getColor(value),
          trailColor: '#e2e8f0',
          textColor: getColor(value),
          textSize: '24px',
        })}
        circleRatio={0.75}
      />
    </div>
  );
}
