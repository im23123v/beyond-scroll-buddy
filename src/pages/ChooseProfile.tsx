import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import logo from '@/assets/logo.png';
import parentAvatar from '@/assets/parent-avatar.png';
import youthAvatar from '@/assets/youth-avatar.png';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';

type ProfileType = 'parent' | 'youth';

const profiles: { id: ProfileType; label: string; desc: string; avatar: string }[] = [
  { id: 'parent', label: 'Parent', desc: 'Manage family profiles and healthy limits', avatar: parentAvatar },
  { id: 'youth', label: 'Youth', desc: 'Manage family profiles and healthy limits', avatar: youthAvatar },
];

const ChooseProfile = () => {
  const [selected, setSelected] = useState<ProfileType | null>(null);
  const { login, onboarded } = useApp();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selected) return;
    login(selected);
    navigate(onboarded ? '/dashboard' : '/mode-selection');
  };

  return (
    <MobileLayout className="flex flex-col">
      {/* Logo */}
      <div className="flex flex-col items-center mt-8 mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        >
          <img src={logo} alt="BeyondScroll Logo" className="w-20 h-20 rounded-2xl" />
        </motion.div>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Choose Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">Who will use this app?</p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-10 h-2 rounded-full bg-primary" />
        <div className="w-3 h-3 rounded-full bg-accent" />
      </div>

      {/* Profile cards */}
      <div className="flex justify-center gap-6 mb-auto">
        {profiles.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            onClick={() => setSelected(p.id)}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className={`relative w-28 h-28 rounded-full border-4 overflow-hidden transition-all duration-300 ${
              selected === p.id 
                ? 'border-primary shadow-lg' 
                : 'border-border'
            }`}>
              <img src={p.avatar} alt={p.label} className="w-full h-full object-cover" />
              {selected === p.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0 -right-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </div>
            <p className="font-semibold text-foreground mt-3">{p.label}</p>
            <p className="text-xs text-muted-foreground text-center mt-1 max-w-[130px]">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Continue button */}
      <div className="mt-auto pt-8 pb-4">
        <Button
          onClick={handleContinue}
          disabled={!selected}
          className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground font-semibold text-lg glow-primary disabled:opacity-40"
        >
          Continue
        </Button>
      </div>
    </MobileLayout>
  );
};

export default ChooseProfile;
