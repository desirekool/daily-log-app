import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlanModal from '../components/plans/PlanModal';
import { createPlan } from '../services/planService';

const PlanNewPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = async (data: { name: string; description: string; sections: any[]; columns: any[] }) => {
    try {
      const plan = await createPlan(data);
      navigate(`/plans/${plan.id}`);
    } catch (err) {
      alert('Failed to create plan');
    }
  };

  return (
    <PlanModal
      onSave={handleSave}
      onClose={() => navigate('/dashboard')}
    />
  );
};

export default PlanNewPage;
