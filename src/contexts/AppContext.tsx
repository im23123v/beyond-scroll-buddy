import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Mode = 'casual' | 'intermediate' | 'extreme' | null;

interface AppState {
  isLoggedIn: boolean;
  userName: string;
  mode: Mode;
  dailyLimit: number; // minutes
  smartTrigger: boolean;
  blockedApps: string[];
  redirectApp: string;
  scrollControlOn: boolean;
  currentStreak: number;
  longestStreak: number;
  totalHoursSaved: number;
  dailyUsage: number[]; // last 7 days in minutes
  onboarded: boolean;
}

interface AppContextType extends AppState {
  login: (name: string) => void;
  logout: () => void;
  setMode: (mode: Mode) => void;
  setDailyLimit: (limit: number) => void;
  setSmartTrigger: (on: boolean) => void;
  toggleBlockedApp: (app: string) => void;
  setRedirectApp: (app: string) => void;
  toggleScrollControl: () => void;
  setOnboarded: (v: boolean) => void;
}

const defaults: AppState = {
  isLoggedIn: false,
  userName: '',
  mode: null,
  dailyLimit: 30,
  smartTrigger: false,
  blockedApps: [],
  redirectApp: 'Kindle',
  scrollControlOn: false,
  currentStreak: 0,
  longestStreak: 0,
  totalHoursSaved: 0,
  dailyUsage: [45, 30, 25, 40, 20, 35, 28],
  onboarded: false,
};

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('beyondscroll');
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  });

  useEffect(() => {
    localStorage.setItem('beyondscroll', JSON.stringify(state));
  }, [state]);

  const login = (name: string) => setState(s => ({ ...s, isLoggedIn: true, userName: name, currentStreak: s.currentStreak || 1 }));
  const logout = () => setState({ ...defaults });
  const setMode = (mode: Mode) => setState(s => ({ ...s, mode }));
  const setDailyLimit = (dailyLimit: number) => setState(s => ({ ...s, dailyLimit }));
  const setSmartTrigger = (smartTrigger: boolean) => setState(s => ({ ...s, smartTrigger }));
  const toggleBlockedApp = (app: string) => setState(s => ({
    ...s,
    blockedApps: s.blockedApps.includes(app) ? s.blockedApps.filter(a => a !== app) : [...s.blockedApps, app],
  }));
  const setRedirectApp = (app: string) => setState(s => ({ ...s, redirectApp: app }));
  const toggleScrollControl = () => setState(s => ({ ...s, scrollControlOn: !s.scrollControlOn }));
  const setOnboarded = (onboarded: boolean) => setState(s => ({ ...s, onboarded }));

  return (
    <AppContext.Provider value={{ ...state, login, logout, setMode, setDailyLimit, setSmartTrigger, toggleBlockedApp, setRedirectApp, toggleScrollControl, setOnboarded }}>
      {children}
    </AppContext.Provider>
  );
};
