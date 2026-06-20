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
  const res = await api(`/api/plans/${planId}/logs`);
  return res.json();
};

export const getLogsBySection = async (planId: number, sectionId: number) => {
  const res = await api(`/api/plans/${planId}/sections/${sectionId}/logs`);
  return res.json();
};

export const getLog = async (planId: number, logId: number) => {
  const res = await api(`/api/plans/${planId}/logs/${logId}`);
  return res.json();
};

export const createLog = async (planId: number, data: LogReq) => {
  const res = await api(`/api/plans/${planId}/logs`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateLog = async (planId: number, logId: number, data: Partial<LogReq>) => {
  const res = await api(`/api/plans/${planId}/logs/${logId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteLog = async (planId: number, logId: number) => {
  await api(`/api/plans/${planId}/logs/${logId}`, { method: 'DELETE' });
};
