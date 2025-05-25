import { useMutation, useQuery } from '@tanstack/react-query';
import { questionsApi, responsesApi, aiApi, chatbotApi } from '@/lib/api';

// Questions hooks
export const useQuestions = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: () => questionsApi.getAll().then(res => res.data),
  });
};

export const useCreateQuestion = () => {
  return useMutation({
    mutationFn: (data: any) => questionsApi.create(data).then(res => res.data),
  });
};

// Responses hooks
export const useResponses = () => {
  return useQuery({
    queryKey: ['responses'],
    queryFn: () => responsesApi.getAll().then(res => res.data),
  });
};

export const useCreateResponse = () => {
  return useMutation({
    mutationFn: (data: any) => responsesApi.create(data).then(res => res.data),
  });
};

// AI hooks
export const useGenerateAIResponse = () => {
  return useMutation({
    mutationFn: (data: any) => aiApi.generateResponse(data).then(res => res.data),
  });
};

// Chatbot hooks
export const useChatbotHistory = () => {
  return useQuery({
    queryKey: ['chatbot-history'],
    queryFn: () => chatbotApi.getHistory().then(res => res.data),
  });
};

export const useSendChatbotMessage = () => {
  return useMutation({
    mutationFn: (data: any) => chatbotApi.sendMessage(data).then(res => res.data),
  });
}; 