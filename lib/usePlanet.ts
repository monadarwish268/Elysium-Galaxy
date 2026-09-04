// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { axiosGet, axiosPost, axiosDelete } from './axios';
// import { IPlanet, CreatePlanetDTO } from '@/interfaces/PlanetInterface';

// export const useGetPlanetsQuery = () => {
//     return useQuery({
//         queryKey: ['planets'],
//         queryFn: () => axiosGet<IPlanet[]>('/planets'),
//     });
// };

// export const useCreatePlanetMutation = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (newPlanet: CreatePlanetDTO) => axiosPost<CreatePlanetDTO, IPlanet>('/planets', newPlanet),
//         onSuccess: () => queryClient.invalidateQueries({ queryKey: ['planets'] }),
//     });
// };


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosGet, axiosPost, axiosDelete, axiosPut } from '@/lib/axios';
import { IPlanet, CreatePlanetDTO } from '@/interfaces/PlanetInterface'; // أو المسار الخاص بالـ interface لديك

// 1. Hook لجلب جميع الكواكب
export const useGetPlanetsQuery = () => {
    return useQuery({
        queryKey: ['planets'],
        queryFn: () => axiosGet<IPlanet[]>('/planets'),
    });
};

// 2. Hook لإضافة كوكب جديد
export const useCreatePlanetMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPlanet: CreatePlanetDTO) =>
            axiosPost<CreatePlanetDTO, IPlanet>('/planets', newPlanet),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['planets'] });
        },
    });
};

export const useUpdatePlanetMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<CreatePlanetDTO> }) =>
            axiosPut<Partial<CreatePlanetDTO>, IPlanet>(`/planets/${id}`, data),
        onSuccess: () => {
            // إعادة جلب البيانات لتحديث الواجهة تلقائياً
            queryClient.invalidateQueries({ queryKey: ['planets'] });
        },
    });
};

// 3. Hook لحذف كوكب
export const useDeletePlanetMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (planetId: string) =>
            axiosDelete<{ message: string }>(`/planets/${planetId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['planets'] });
        },
    });
};

