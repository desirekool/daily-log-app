import api from './api';

export const login = async (username: string, password: string) => {
  const res = await api('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

export const register = async (username: string, email: string, password: string) => {
  const res = await api('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
};

export const logout = async () => {
  await api('/api/auth/logout', { method: 'POST' });
};

export const getCurrentUser = async () => {
  const res = await api('/api/auth/me');
  return res.json();
};
