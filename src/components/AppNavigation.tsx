import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  PieChart, 
  Plus, 
  History, 
  Settings,
  Menu,
  X,
  TrendingUp
} from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const AppNavigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: PieChart },
    { id: 'add-investment', label: 'Tambah', icon: Plus },
    { id: 'history', label: 'Riwayat', icon: History },
  ];

  const handleNavClick = (view: string) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-card/80 backdrop-blur-lg rounded-full border border-border shadow-investment">
        <div className="flex items-center px-2 py-2">
          {/* Logo */}
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold gradient-text">Vestaro</span>
          </div>
          
          {/* Navigation Items */}
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavClick(item.id)}
              className={`mx-1 ${
                currentView === item.id 
                  ? 'bg-gradient-primary text-primary-foreground shadow-investment' 
                  : 'hover:bg-secondary/80'
              }`}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold gradient-text text-lg">Vestaro</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
            <div className="fixed top-16 left-0 right-0 bg-card border-b border-border shadow-lg">
              <div className="p-4 space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      currentView === item.id 
                        ? 'bg-gradient-primary text-primary-foreground' 
                        : ''
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => handleNavClick(item.id)}
              className={`flex-1 flex-col h-auto py-2 ${
                currentView === item.id 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground'
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default AppNavigation;