import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, BookOpen, Calculator, StickyNote, GraduationCap, MessageCircle, Instagram, Youtube, Twitter, Gamepad2, Music } from 'lucide-react';
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

const redirectApps = [
  { name: 'Kindle', icon: <BookOpen className="w-4 h-4" /> },
  { name: 'Notes', icon: <StickyNote className="w-4 h-4" /> },
  { name: 'Calculator', icon: <Calculator className="w-4 h-4" /> },
  { name: 'Study App', icon: <GraduationCap className="w-4 h-4" /> },
];

const SelectApps = () => {
  const { blockedApps, toggleBlockedApp, redirectApp, setRedirectApp } = useApp();
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <button onClick={() => navigate(-1)} className="mb-6 text-muted-foreground">
        <ArrowLeft className="w-5 h-5" />
      </button>

      <h1 className="text-2xl font-bold font-display text-foreground mb-2">Distracting Apps</h1>
      <p className="text-muted-foreground text-sm mb-6">Select apps to block or monitor</p>

      <div className="space-y-2 mb-8">
        {distractingApps.map((app, i) => (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                {app.icon}
              </div>
              <span className="text-foreground text-sm font-medium">{app.name}</span>
            </div>
            <Switch
              checked={blockedApps.includes(app.name)}
              onCheckedChange={() => toggleBlockedApp(app.name)}
            />
          </motion.div>
        ))}
      </div>

      {/* Redirect App */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-foreground mb-3">Redirect To</p>
        <Select value={redirectApp} onValueChange={setRedirectApp}>
          <SelectTrigger className="h-12 rounded-xl bg-secondary border-border/50 text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {redirectApps.map(a => (
              <SelectItem key={a.name} value={a.name}>{a.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
