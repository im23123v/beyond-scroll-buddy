import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
}

const MobileLayout = ({ children, className = '' }: Props) => (
  <div className="mobile-container bg-background relative overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`min-h-screen px-6 py-8 ${className}`}
    >
      {children}
    </motion.div>
  </div>
);

export default MobileLayout;
