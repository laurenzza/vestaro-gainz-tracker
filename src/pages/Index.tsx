import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import InvestmentForm from "@/components/InvestmentForm";
import InvestmentHistory from "@/components/InvestmentHistory";
import AppNavigation from "@/components/AppNavigation";

const Index = () => {
  const [currentView, setCurrentView] = useState('hero');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'hero':
        return <Hero />;
      case 'dashboard':
        return <Dashboard />;
      case 'add-investment':
        return <InvestmentForm />;
      case 'history':
        return <InvestmentHistory />;
      default:
        return <Hero />;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <AppNavigation 
          currentView={currentView} 
          onViewChange={setCurrentView}
        />
        
        {/* Add top padding for mobile to account for fixed header */}
        <div className={currentView !== 'hero' ? 'pt-16 md:pt-20 pb-16 md:pb-0' : ''}>
          {renderCurrentView()}
        </div>
        
        <Toaster />
        <Sonner />
      </div>
    </TooltipProvider>
  );
};

export default Index;
