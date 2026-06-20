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
  const response = await api.put(`/api/plans/${id}/phase`, phase, {
    headers: { 'Content-Type': 'text/plain' },
  });
  return response.data;
};

export const updatePlanAndReturn = async (id: number, data: Partial<PlanReq>) => {
  const response = await api.put(`/api/plans/${id}`, data);
  return response.data;
};

export const updatePlanPhaseAndReturn = async (id: number, phase: string) => {
  const response = await api.put(`/api/plans/${id}/phase`, phase, {
    headers: { 'Content-Type': 'text/plain' },
  });
  return response.data;
};

export const getPlans = async () => {
  const response = await api.get('/api/plans');
  return response.data;
};

export const getPlan = async (id: number) => {
  const response = await api.get(`/api/plans/${id}`);
  return response.data;
};

export const createPlan = async (data: PlanReq) => {
  const response = await api.post('/api/plans', data);
  return response.data;
};

export const updatePlan = async (id: number, data: Partial<PlanReq>) => {
  const response = await api.put(`/api/plans/${id}`, data);
  return response.data;
};

export const deletePlan = async (id: number) => {
  await api.delete(`/api/plans/${id}`);
};

export const getSections = async (planId: number) => {
  const response = await api.get(`/api/plans/${planId}/sections`);
  return response.data;
};

export const createSection = async (planId: number, data: SectionReq) => {
  const response = await api.post(`/api/plans/${planId}/sections`, data);
  return response.data;
};

export const getSectionProgress = async (planId: number, sectionId: number) => {
  const response = await api.get(`/api/plans/${planId}/sections/${sectionId}/progress`);
  return response.data;
};

export const getColumns = async (planId: number) => {
  const response = await api.get(`/api/plans/${planId}/columns`);
  return response.data;
};

export const createColumn = async (planId: number, data: PlanColumnReq) => {
  const response = await api.post(`/api/plans/${planId}/columns`, data);
  return response.data;
};
