import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/auth/AuthContext';
import { Link } from 'react-router-dom';
import { getPlans } from '../services/planService';
import { Plan } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    getPlans().then(setPlans).catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.username || 'User'}!</h1>
        <p className="text-muted-foreground mt-1">Track your daily progress across multiple plans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold text-primary">{plans.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Total Plans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold text-primary">
              {plans.reduce((sum, p) => sum + (p.sections?.length || 0), 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Total Sections</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold text-primary">
              {plans.reduce((sum, p) => sum + (p.dailyLogs?.length || 0), 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Total Entries</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-4">Your Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Link key={plan.id} to={`/plans/${plan.id}`} className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                {plan.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{plan.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{(plan.sections?.length || 0)} sections</span>
                  <span>{(plan.dailyLogs?.length || 0)} entries</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {plans.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground mb-4">No plans yet. Create your first plan to get started!</p>
            <Link to="/plans/new">
              <Button>Create Your First Plan</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
