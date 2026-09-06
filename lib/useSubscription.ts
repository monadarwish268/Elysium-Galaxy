import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/lib/axios';

export interface Subscription {
  id: string;
  userId: string;
  planType: string;
  message: string;
  amount: number;
  paymentStatus: string;
  paidAt: string;
  isActive: boolean;
  startDate: string;
  endDate: string | null;
}

export interface CreateSubscriptionDTO {
  userId?: string;
  planType?: string;
  message: string;
  amount?: 1;
  endDate?: string | null;
}

export interface UpdateSubscriptionDTO {
  id: string;
  planType?: string;
  message?: string;
  isActive?: boolean;
  endDate?: string | null;
}

export const useGetSubscriptionsQuery = () => useQuery({
  queryKey: ['subscriptions'],
  queryFn: () => axiosGet<Subscription[]>('/subscriptions'),
});

export const useCreateSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSubscriptionDTO) =>
      axiosPost<CreateSubscriptionDTO, Subscription>('/subscriptions', { ...data, amount: 1 }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subscriptions'] }),
  });
};

export const useUpdateSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UpdateSubscriptionDTO) =>
      axiosPut<UpdateSubscriptionDTO, Subscription>('/subscriptions', { id, ...data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subscriptions'] }),
  });
};

export const useDeleteSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axiosDelete<{ message: string }>(`/subscriptions?id=${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subscriptions'] }),
  });
};