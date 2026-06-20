import api from './api';

export interface LogEntryData {
  [columnId: number]: string;
}

export interface LogReq {
  date: string;
  dayNumber?: number;
  sectionId: number;
  entries: LogEntryData;
  comment?: string;
}

export const getLogs = async (planId: number) => {
  const response = await api.get(`/api/plans/${planId}/logs`);
  return response.data;
};

export const getLogsBySection = async (planId: number, sectionId: number) => {
  const response = await api.get(`/api/plans/${planId}/sections/${sectionId}/logs`);
  return response.data;
};

export const getLog = async (planId: number, logId: number) => {
  const response = await api.get(`/api/plans/${planId}/logs/${logId}`);
  return response.data;
};

export const createLog = async (planId: number, data: LogReq) => {
  const response = await api.post(`/api/plans/${planId}/logs`, data);
  return response.data;
};

export const updateLog = async (planId: number, logId: number, data: Partial<LogReq>) => {
  const response = await api.put(`/api/plans/${planId}/logs/${logId}`, data);
  return response.data;
};

export const deleteLog = async (planId: number, logId: number) => {
  await api.delete(`/api/plans/${planId}/logs/${logId}`);
};
