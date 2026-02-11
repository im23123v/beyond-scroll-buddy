import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Brain } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const Configuration = () => {
  const { dailyLimit, setDailyLimit, smartTrigger, setSmartTrigger } = useApp();
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <button onClick={() => navigate(-1)} className="mb-6 text-muted-foreground">
        <ArrowLeft className="w-5 h-5" />
      </button>

      <h1 className="text-2xl font-bold font-display text-foreground mb-2">Configure</h1>
      <p className="text-muted-foreground text-sm mb-8">Personalize your scroll control rules</p>

      {/* Time Range */}
      <div className="glass-card p-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Daily Scroll Time</p>
            <p className="text-xs text-muted-foreground">Set your allowed time range</p>
          </div>
        </div>

        <div className="px-1">
          <Slider
            value={[dailyLimit]}
            onValueChange={v => setDailyLimit(v[0])}
            min={10}
            max={120}
            step={5}
            className="my-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>10 min</span>
            <span className="text-primary font-semibold text-base">{dailyLimit} min</span>
            <span>120 min</span>
          </div>
        </div>
      </div>

      {/* Smart Trigger */}
      <div className="glass-card p-5 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Smart Trigger</p>
            <p className="text-xs text-muted-foreground">Blocks when app opened too frequently</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button
            onClick={() => setSmartTrigger(true)}
            className={`h-11 rounded-xl font-medium ${smartTrigger ? 'gradient-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-muted'}`}
          >
            Yes
          </Button>
          <Button
            onClick={() => setSmartTrigger(false)}
            className={`h-11 rounded-xl font-medium ${!smartTrigger ? 'gradient-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-muted'}`}
          >
            No
          </Button>
        </div>
      </div>

      <Button
        onClick={() => navigate('/select-apps')}
        className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold glow-primary"
      >
        Continue
      </Button>
    </MobileLayout>
  );
};

export default Configuration;
