import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosGet, axiosPost } from './axios';
import { IActivity, CreateActivityDTO } from '@/interfaces/ActivityInterface';

export const useGetActivitiesQuery = () => {
    return useQuery({
        queryKey: ['activities'],
        queryFn: () => axiosGet<IActivity[]>('/activity'),
    });
};

export const useCreateActivityMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newActivity: CreateActivityDTO) => axiosPost<CreateActivityDTO, IActivity>('/activity', newActivity),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activities'] }),
    });
};