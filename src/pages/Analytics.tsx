import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Clock, TrendingDown } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/MobileLayout';
import { motion } from 'framer-motion';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Analytics = () => {
  const { dailyUsage, dailyLimit, currentStreak, longestStreak, totalHoursSaved } = useApp();
  const navigate = useNavigate();
  const maxUsage = Math.max(...dailyUsage, dailyLimit);

  return (
    <MobileLayout>
      <button onClick={() => navigate(-1)} className="mb-6 text-muted-foreground">
        <ArrowLeft className="w-5 h-5" />
      </button>

      <h1 className="text-2xl font-bold font-display text-foreground mb-6">Analytics</h1>

      {/* Daily Usage Graph */}
      <div className="glass-card p-5 mb-4">
        <p className="text-xs text-muted-foreground mb-4">Daily Usage (min)</p>
        <div className="flex items-end justify-between gap-2 h-32">
          {dailyUsage.map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(val / maxUsage) * 100}%` }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`w-full rounded-t-lg min-h-[4px] ${val > dailyLimit ? 'bg-destructive' : 'gradient-primary'}`}
              />
              <span className="text-[10px] text-muted-foreground">{days[i]}</span>
            </div>
          ))}
        </div>
        {/* Limit line label */}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-3 h-0.5 bg-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Limit: {dailyLimit} min</span>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="glass-card p-5 mb-4">
        <p className="text-xs text-muted-foreground mb-3">Weekly Report</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary rounded-xl p-3">
            <TrendingDown className="w-4 h-4 text-success mb-1" />
            <p className="text-lg font-bold font-display text-foreground">
              {Math.round(dailyUsage.reduce((a, b) => a + b, 0) / 7)} min
            </p>
            <p className="text-[10px] text-muted-foreground">Avg daily scroll</p>
          </div>
          <div className="bg-secondary rounded-xl p-3">
            <Clock className="w-4 h-4 text-primary mb-1" />
            <p className="text-lg font-bold font-display text-foreground">
              {Math.round((dailyLimit * 7 - dailyUsage.reduce((a, b) => a + b, 0)) / 60 * 10) / 10}h
            </p>
            <p className="text-[10px] text-muted-foreground">Time saved</p>
          </div>
        </div>
      </div>

      {/* Streak Stats */}
      <div className="glass-card p-5">
        <p className="text-xs text-muted-foreground mb-3">Streak Stats</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="flex justify-center mb-1">
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <p className="text-lg font-bold font-display text-foreground">{currentStreak}</p>
            <p className="text-[10px] text-muted-foreground">Current</p>
          </div>
          <div>
            <div className="flex justify-center mb-1">
              <Flame className="w-5 h-5 text-accent" />
            </div>
            <p className="text-lg font-bold font-display text-foreground">{longestStreak}</p>
            <p className="text-[10px] text-muted-foreground">Longest</p>
          </div>
          <div>
            <div className="flex justify-center mb-1">
              <Clock className="w-5 h-5 text-success" />
            </div>
            <p className="text-lg font-bold font-display text-foreground">{totalHoursSaved}h</p>
            <p className="text-[10px] text-muted-foreground">Total saved</p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Analytics;
