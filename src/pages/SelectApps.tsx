import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Smartphone, BookOpen, Calculator, StickyNote, GraduationCap, MessageCircle, Instagram, Youtube, Twitter, Gamepad2, Music, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const distractingApps = [
  { name: 'Instagram', icon: <Instagram className="w-5 h-5" /> },
  { name: 'YouTube', icon: <Youtube className="w-5 h-5" /> },
  { name: 'Twitter', icon: <Twitter className="w-5 h-5" /> },
  { name: 'TikTok', icon: <Smartphone className="w-5 h-5" /> },
  { name: 'Games', icon: <Gamepad2 className="w-5 h-5" /> },
  { name: 'Spotify', icon: <Music className="w-5 h-5" /> },
  { name: 'WhatsApp', icon: <MessageCircle className="w-5 h-5" /> },
];

const redirectOptions = [
  { name: 'Kindle', icon: <BookOpen className="w-4 h-4" /> },
  { name: 'Notes', icon: <StickyNote className="w-4 h-4" /> },
  { name: 'Calculator', icon: <Calculator className="w-4 h-4" /> },
  { name: 'Study App', icon: <GraduationCap className="w-4 h-4" /> },
];

const SelectApps = () => {
  const { blockedApps, toggleBlockedApp, redirectApps, setRedirectApp } = useApp();
  const navigate = useNavigate();

  const getRedirect = (app: string) => redirectApps[app] || 'Kindle';

  return (
    <MobileLayout>
      <button onClick={() => navigate(-1)} className="mb-6 text-muted-foreground">
        <ArrowLeft className="w-5 h-5" />
      </button>

      <h1 className="text-2xl font-bold font-display text-foreground mb-2">Distracting Apps</h1>
      <p className="text-muted-foreground text-sm mb-6">Select apps to block & choose where to redirect</p>

      <div className="space-y-2 mb-8">
        {distractingApps.map((app, i) => {
          const isBlocked = blockedApps.includes(app.name);
          return (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                    {app.icon}
                  </div>
                  <span className="text-foreground text-sm font-medium">{app.name}</span>
                </div>
                <Switch
                  checked={isBlocked}
                  onCheckedChange={() => toggleBlockedApp(app.name)}
                />
              </div>

              {/* Per-app redirect selector */}
              {isBlocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center gap-2 pl-12"
                >
                  <span className="text-xs text-muted-foreground whitespace-nowrap">Redirect →</span>
                  <Select value={getRedirect(app.name)} onValueChange={(v) => setRedirectApp(app.name, v)}>
                    <SelectTrigger className="h-9 rounded-lg bg-secondary border-border/50 text-foreground text-xs flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {redirectOptions.map(r => (
                        <SelectItem key={r.name} value={r.name}>{r.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Test redirect button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-9 w-9 p-0 text-primary hover:bg-primary/10"
                    onClick={() => navigate(`/redirect?app=${encodeURIComponent(app.name)}`)}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <Button
        onClick={() => navigate('/dashboard')}
        className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold glow-primary"
      >
        Done
      </Button>
    </MobileLayout>
  );
};

export default SelectApps;
