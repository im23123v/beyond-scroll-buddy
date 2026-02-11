import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ModeSelection from "./pages/ModeSelection";
import Configuration from "./pages/Configuration";
import SelectApps from "./pages/SelectApps";
import Analytics from "./pages/Analytics";
import RedirectOverlay from "./pages/RedirectOverlay";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mode-selection" element={<ModeSelection />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/select-apps" element={<SelectApps />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/redirect" element={<RedirectOverlay />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
