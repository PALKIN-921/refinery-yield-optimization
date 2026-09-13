import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface QualityGaugeProps {
  score: number;
}

export default function QualityGauge({ score }: QualityGaugeProps) {
  const getColor = (val: number) => {
    if (val >= 70) return '#10B981';
    if (val >= 50) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="w-48 h-48 mx-auto">
      <CircularProgressbar
        value={score}
        maxValue={100}
        text={`${score}`}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: 'round',
          pathTransitionDuration: 1,
          pathColor: getColor(score),
          trailColor: '#e2e8f0',
          textColor: '#0f172a',
          textSize: '28px',
        })}
        circleRatio={0.75}
      />
    </div>
  );
}
