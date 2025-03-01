import axios from 'axios';
import { Site, Test } from '../types';

const API_URL = 'http://localhost:3100';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchSites = async (): Promise<Site[]> => {
  const response = await api.get<Site[]>('/sites');
  return response.data;
};

export const fetchTests = async (): Promise<Test[]> => {
  const response = await api.get<Test[]>('/tests');
  return response.data;
};

export const fetchSiteById = async (id: number): Promise<Site> => {
  const response = await api.get<Site>(`/sites/${id}`);
  return response.data;
};

export const fetchTestById = async (id: number): Promise<Test> => {
  const response = await api.get<Test>(`/tests/${id}`);
  return response.data;
};