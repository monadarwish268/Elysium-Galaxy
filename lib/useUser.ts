// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { axiosGet, axiosPost, axiosDelete } from './axios';
// import { IUser, CreateUserDTO } from '@/interfaces/UserInterface';

// export const useGetUsersQuery = () => {
//   return useQuery({
//     queryKey: ['users'],
//     queryFn: () => axiosGet<IUser[]>('/users'),
//   });
// };

// export const useCreateUserMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (newUser: CreateUserDTO) => axiosPost<CreateUserDTO, IUser>('/users', newUser),
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
//   });
// };

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosGet, axiosPost, axiosPut, axiosDelete } from '@/lib/axios';
import { 
  IUser, 
  CreateUserDTO, 
  UpdateUserDTO, 
  LoginUserDTO, 
  LoginResponseDTO 
} from '@/interfaces/UserInterface';

// 1. Hook لجلب جميع المستخدمين
export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => axiosGet<IUser[]>('/users'),
  });
};

// 2. Hook لإنشاء مستخدم جديد (Register)
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser: CreateUserDTO) =>
      axiosPost<CreateUserDTO, IUser>('/users', newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// 3. Hook لتسجيل الدخول (Login)
export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: (loginData: LoginUserDTO) =>
      axiosPost<LoginUserDTO, LoginResponseDTO>('/users/login', loginData),
  });
};

// 4. Hook لتعديل بيانات مستخدم
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDTO }) =>
      axiosPut<UpdateUserDTO, IUser>(`/users/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// 5. Hook لحذف مستخدم
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      axiosDelete<{ message: string }>(`/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};