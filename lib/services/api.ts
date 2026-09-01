// lib/services/api.ts
import { api } from '@/lib/baseUrl';

// Psychologist Requests
export const getPsychologists = () => api.get('/psychologists');
export const createPsychologist = (data: Record<string, unknown>) => api.post('/psychologists', data);
export const updatePsychologist = (id: string, data: Record<string, unknown>) => api.put(`/psychologists/${id}`, data);
export const deletePsychologist = (id: string) => api.delete(`/psychologists/${id}`);

// Booking Requests
export const getBookings = () => api.get('/bookings');
export const createBooking = (data: Record<string, unknown>) => api.post('/bookings', data);
export const updateBooking = (id: string, data: Record<string, unknown>) => api.put(`/bookings/${id}`, data);
export const deleteBooking = (id: string) => api.delete(`/bookings/${id}`);

// Subscription Requests
export const getSubscriptions = () => api.get('/subscriptions');
export const createSubscription = (data: Record<string, unknown>) => api.post('/subscriptions', data);
export const updateSubscription = (id: string, data: Record<string, unknown>) => api.put(`/subscriptions/${id}`, data);
export const deleteSubscription = (id: string) => api.delete(`/subscriptions/${id}`);