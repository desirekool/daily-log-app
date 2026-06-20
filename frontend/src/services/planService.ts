import api from './api';

export interface PlanColumnReq {
  name: string;
  description: string;
  type: string;
  isTracker: boolean;
  position: number;
}

export interface SectionReq {
  name: string;
  description: string;
  position: number;
}

export interface PlanReq {
  name: string;
  description: string;
  sections: SectionReq[];
  columns: PlanColumnReq[];
  phase?: string;
}

export const updatePlanPhase = async (id: number, phase: string) => {
  const res = await api(`/api/plans/${id}/phase`, {
    method: 'PUT',
    body: phase,
    headers: { 'Content-Type': 'text/plain' },
  });
  return res.json();
};

export const updatePlanAndReturn = async (id: number, data: Partial<PlanReq>) => {
  const res = await api(`/api/plans/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updatePlanPhaseAndReturn = async (id: number, phase: string) => {
  const res = await api(`/api/plans/${id}/phase`, {
    method: 'PUT',
    body: phase,
    headers: { 'Content-Type': 'text/plain' },
  });
  return res.json();
};

export const getPlans = async () => {
  const res = await api('/api/plans');
  return res.json();
};

export const getPlan = async (id: number) => {
  const res = await api(`/api/plans/${id}`);
  return res.json();
};

export const createPlan = async (data: PlanReq) => {
  const res = await api('/api/plans', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updatePlan = async (id: number, data: Partial<PlanReq>) => {
  const res = await api(`/api/plans/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deletePlan = async (id: number) => {
  await api(`/api/plans/${id}`, { method: 'DELETE' });
};

export const getSections = async (planId: number) => {
  const res = await api(`/api/plans/${planId}/sections`);
  return res.json();
};

export const createSection = async (planId: number, data: SectionReq) => {
  const res = await api(`/api/plans/${planId}/sections`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getSectionProgress = async (planId: number, sectionId: number) => {
  const res = await api(`/api/plans/${planId}/sections/${sectionId}/progress`);
  return res.json();
};

export const getColumns = async (planId: number) => {
  const res = await api(`/api/plans/${planId}/columns`);
  return res.json();
};

export const createColumn = async (planId: number, data: PlanColumnReq) => {
  const res = await api(`/api/plans/${planId}/columns`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.json();
};
