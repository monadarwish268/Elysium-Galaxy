import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosGet, axiosPost, axiosPut, axiosDelete } from './axios';
import { IActivity, CreateActivityDTO, UpdateActivityDTO } from '@/interfaces/ActivityInterface';

// 1. جلب كل الأنشطة (GET)
export const useGetActivitiesQuery = () => {
    return useQuery({
        queryKey: ['activities'],
        queryFn: () => axiosGet<IActivity[]>('/activity'),
    });
};

// 2. جلب نشاط محدد بواسطة ID (GET BY ID)
export const useGetActivityByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ['activities', id],
        queryFn: () => axiosGet<IActivity>(`/activity/${id}`),
        enabled: !!id,
    });
};

// 3. إنشاء نشاط جديد (POST)
export const useCreateActivityMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newActivity: CreateActivityDTO) => 
            axiosPost<CreateActivityDTO, IActivity>('/activity', newActivity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });
};

// 4. تعديل نشاط حالي (PUT)
export const useUpdateActivityMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateActivityDTO }) => 
            axiosPut<UpdateActivityDTO, IActivity>(`/activity/${id}`, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });
            queryClient.invalidateQueries({ queryKey: ['activities', variables.id] });
        },
    });
};

// 5. حذف نشاط (DELETE)
export const useDeleteActivityMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => 
            axiosDelete<null>(`/activity/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });
};