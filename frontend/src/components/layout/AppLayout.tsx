import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getPlans } from '../../services/planService';
import { Plan } from '../../types';
import { Button } from '../ui/button';
import ThemeSwitcher from '../ui/ThemeSwitcher';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      getPlans().then(setPlans).catch(() => {});
    }
  }, [isAuthenticated, location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return <>{children}</>;

  const currentPlanId = location.pathname.match(/\/plans\/(\d+)/)?.[1];

  return (
    <div className="min-h-screen bg-muted/50 flex">
      <div className="w-64 bg-card border-r border-border flex flex-col fixed h-full z-10">
        <div className="p-4 border-b border-border">
          <Link to="/dashboard" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
            Daily Log App
          </Link>
        </div>
        <div className="px-3 py-3 border-b border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Plans</p>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {plans.map((plan) => (
            <Link
              key={plan.id}
              to={`/plans/${plan.id}`}
              className={`block px-4 py-2.5 text-sm mx-2 rounded-md transition-colors ${
                String(plan.id) === currentPlanId
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <div className="flex items-center">
                <span className="text-lg mr-2">
                  {String(plan.id) === currentPlanId ? '●' : '○'}
                </span>
                <div className="truncate flex-1">
                  <div className="truncate flex items-center gap-1.5">
                    {plan.name}
                    <span className="text-[10px] uppercase tracking-wider px-1 py-0.5 rounded-sm bg-muted text-muted-foreground/70">
                      {plan.phase || 'SETUP'}
                    </span>
                  </div>
                  {plan.description && (
                    <div className="text-xs text-muted-foreground/70 truncate">{plan.description}</div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="p-3 border-t border-border space-y-2">
          <Button
            onClick={() => navigate('/plans/new')}
            className="w-full"
            size="sm"
          >
            + New Plan
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-card border-b border-border">
          <div className="px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              <span className="text-sm text-muted-foreground">Welcome, {user?.username || 'User'}</span>
              <Button onClick={handleLogout} variant="destructive" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
