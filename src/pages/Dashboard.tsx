import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, BarChart3, ChevronRight, Power, User, Shield, ShieldOff } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { userName, scrollControlOn, toggleScrollControl, mode, currentStreak, longestStreak } = useApp();
  const navigate = useNavigate();

  const modeLabel = mode === 'casual' ? 'Casual' : mode === 'intermediate' ? 'Intermediate' : mode === 'extreme' ? 'Extreme' : 'Not Set';

  return (
    <MobileLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-muted-foreground text-sm">Welcome back,</p>
          <h1 className="text-2xl font-bold font-display text-foreground">{userName || 'User'}</h1>
        </div>
        <button onClick={() => navigate('/login')} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Scroll Control Card */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className={`glass-card p-5 ${scrollControlOn ? 'glow-success' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {scrollControlOn ? (
                <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-success" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                  <ShieldOff className="w-5 h-5 text-destructive" />
                </div>
              )}
              <div>
                <p className="font-semibold text-foreground text-sm">Scroll Control</p>
                <p className={`text-xs ${scrollControlOn ? 'text-success' : 'text-destructive'}`}>
                  {scrollControlOn ? 'Active — Protecting you' : 'Inactive'}
                </p>
              </div>
            </div>
            <Button
              onClick={toggleScrollControl}
              size="sm"
              className={`rounded-xl h-10 w-10 p-0 ${scrollControlOn ? 'bg-success hover:bg-success/80' : 'gradient-primary'}`}
            >
              <Power className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Level Card */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/mode-selection')}
          className="glass-card p-5 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Your Level</p>
              <p className="font-semibold text-foreground">{modeLabel}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.div>

        {/* Streak Card */}
        <div className="glass-card p-5">
          <p className="text-xs text-muted-foreground mb-3">Streak</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: Math.min(currentStreak, 7) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Flame className="w-7 h-7 text-primary fire-glow" />
                </motion.div>
              ))}
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-gradient">{currentStreak}</p>
              <p className="text-xs text-muted-foreground">days</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Longest: {longestStreak} days</p>
        </div>

        {/* Analytics */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/analytics')}
          className="glass-card p-5 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <p className="font-semibold text-foreground text-sm">View Analytics</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/select-apps')}
            className="h-12 rounded-xl border-border/50 bg-secondary text-foreground hover:bg-muted text-sm"
          >
            Manage Apps
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/configuration')}
            className="h-12 rounded-xl border-border/50 bg-secondary text-foreground hover:bg-muted text-sm"
          >
            Settings
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Dashboard;
