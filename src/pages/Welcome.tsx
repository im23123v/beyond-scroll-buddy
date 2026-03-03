import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import logo from '@/assets/logo.png';
import illustration from '@/assets/welcome-illustration.png';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout className="flex flex-col">
      {/* Logo */}
      <div className="flex justify-center mt-4">
        <motion.img
          src={logo}
          alt="BeyondScroll Logo"
          className="w-16 h-16 rounded-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        />
      </div>

      {/* Title */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h1 className="text-2xl font-bold font-display text-foreground">
          Welcome to <span className="text-primary">beyondscroll</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Let's set up your family's digital space
        </p>
      </motion.div>

      {/* Illustration */}
      <motion.div
        className="flex justify-center my-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
      >
        <img src={illustration} alt="Screen time tracking" className="w-56 h-56 object-contain" />
      </motion.div>

      {/* Empty state text */}
      <motion.div
        className="text-center mb-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-2">No profiles yet</h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px] mx-auto">
          <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1 align-middle" />
          Add a member to start tracking screen time and healthy limits.
        </p>
      </motion.div>

      {/* Add Profile button */}
      <div className="mt-auto pt-6 pb-4">
        <Button
          onClick={() => navigate('/choose-profile')}
          className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground font-semibold text-lg glow-primary gap-2"
        >
          <ArrowRight className="w-5 h-5" />
          Add Profile
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Welcome;
