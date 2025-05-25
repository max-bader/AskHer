import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Questions
export const getQuestions = () => api.get('/questions');
export const getQuestion = (id: string) => api.get(`/questions/${id}`);
export const createQuestion = (data: any) => api.post('/questions', data);
export const updateQuestion = (id: string, data: any) => api.put(`/questions/${id}`, data);

// Responses
export const getResponses = (questionId: string) => api.get(`/responses/${questionId}`);
export const createResponse = (questionId: string, data: any) => api.post(`/responses/${questionId}`, data);

// AI/Chatbot
export const getChatbotResponse = (message: string) => api.post('/chatbot/message', { message });

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api; 