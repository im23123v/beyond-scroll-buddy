import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pause, ArrowRight, Coffee, AlertTriangle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

const RedirectOverlay = () => {
  const { redirectApps, mode } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const blockedApp = searchParams.get('app') || '';
  const redirectTo = redirectApps[blockedApp] || 'Kindle';

  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col items-center justify-center px-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 150 }}
        className="text-center"
      >
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 glow-primary">
          <Pause className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-2xl font-bold font-display text-foreground mb-2">Pause.</h1>
        <p className="text-lg text-foreground mb-1">Is this intentional?</p>
        {blockedApp && (
          <p className="text-primary text-sm font-medium mb-1">You tried to open {blockedApp}</p>
        )}
        <p className="text-muted-foreground text-sm mb-10">You've reached your scroll limit.</p>

        <div className="space-y-3 w-full">
          <Button
            onClick={() => navigate('/dashboard')}
            className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold glow-primary"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Open {redirectTo}
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="w-full h-12 rounded-xl border-border/50 bg-secondary text-foreground hover:bg-muted"
          >
            <Coffee className="w-4 h-4 mr-2" />
            Take 2-min break
          </Button>

          {mode !== 'extreme' && (
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="w-full h-12 rounded-xl text-destructive hover:bg-destructive/10"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Emergency Override
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RedirectOverlay;
