import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Coffee, Zap, Flame } from 'lucide-react';
import { useApp, Mode } from '@/contexts/AppContext';
import MobileLayout from '@/components/MobileLayout';

const modes: { id: Mode; label: string; desc: string; icon: React.ReactNode }[] = [
  { id: 'casual', label: 'Casual', desc: 'Light restrictions with time-based limits. Perfect to start.', icon: <Coffee className="w-6 h-6" /> },
  { id: 'intermediate', label: 'Intermediate', desc: 'Strict time windows and aggressive limits for serious focus.', icon: <Zap className="w-6 h-6" /> },
  { id: 'extreme', label: 'Extreme', desc: 'Full blocking during selected hours. No overrides allowed.', icon: <Flame className="w-6 h-6" /> },
];

const ModeSelection = () => {
  const { mode: currentMode, setMode, setOnboarded } = useApp();
  const navigate = useNavigate();

  const handleSelect = (m: Mode) => {
    setMode(m);
    setOnboarded(true);
    navigate('/configuration');
  };

  return (
    <MobileLayout>
      <button onClick={() => navigate(-1)} className="mb-6 text-muted-foreground">
        <ArrowLeft className="w-5 h-5" />
      </button>

      <h1 className="text-2xl font-bold font-display text-foreground mb-2">Select Your Mode</h1>
      <p className="text-muted-foreground text-sm mb-8">Choose how strict you want your scroll control</p>

      <div className="space-y-4">
        {modes.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(m.id)}
            className={`glass-card p-5 cursor-pointer transition-all ${
              currentMode === m.id ? 'border-primary/50 glow-primary' : 'hover:border-border'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                currentMode === m.id ? 'gradient-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
              }`}>
                {m.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{m.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </MobileLayout>
  );
};

export default ModeSelection;
