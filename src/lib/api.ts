import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Questions API
export const questionsApi = {
  getAll: () => api.get('/questions'),
  getById: (id: string) => api.get(`/questions/${id}`),
  create: (data: any) => api.post('/questions', data),
};

// Responses API
export const responsesApi = {
  getAll: () => api.get('/responses'),
  getById: (id: string) => api.get(`/responses/${id}`),
  create: (data: any) => api.post('/responses', data),
};

// AI API
export const aiApi = {
  generateResponse: (data: any) => api.post('/ai/generate', data),
};

// Chatbot API
export const chatbotApi = {
  sendMessage: (data: any) => api.post('/chatbot/chat', data),
  getHistory: () => api.get('/chatbot/history'),
};

export default api; 