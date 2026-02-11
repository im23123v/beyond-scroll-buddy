import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Flame } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { login, onboarded } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) return setError('Enter a valid email');
    if (password.length < 6) return setError('Password must be 6+ characters');
    if (isSignup && !name.trim()) return setError('Enter your name');

    login(isSignup ? name : email.split('@')[0]);
    navigate(onboarded ? '/dashboard' : '/mode-selection');
  };

  return (
    <MobileLayout className="flex flex-col justify-center">
      <div className="flex flex-col items-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 glow-primary"
        >
          <Flame className="w-8 h-8 text-primary-foreground" />
        </motion.div>
        <h1 className="text-3xl font-bold font-display text-gradient">BeyondScroll</h1>
        <p className="text-muted-foreground text-sm mt-1">Take control of your screen time</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
            <Input
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="h-12 bg-secondary border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground"
            />
          </motion.div>
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="h-12 bg-secondary border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground"
        />
        <div className="relative">
          <Input
            type={showPass ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="h-12 bg-secondary border-border/50 rounded-xl pr-12 text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        <Button type="submit" className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold text-base glow-primary">
          {isSignup ? 'Create Account' : 'Sign In'}
        </Button>

        <button
          type="button"
          onClick={() => { setIsSignup(!isSignup); setError(''); }}
          className="w-full text-center text-sm text-muted-foreground py-2"
        >
          {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>

        {!isSignup && (
          <p className="text-center text-xs text-muted-foreground">Forgot Password?</p>
        )}
      </form>
    </MobileLayout>
  );
};

export default Login;
