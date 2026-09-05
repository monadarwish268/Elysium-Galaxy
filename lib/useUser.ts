import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosGet, axiosPost, axiosPut, axiosDelete } from '@/lib/axios';
import {
  IUser,
  CreateUserDTO,
  UpdateUserDTO,
  LoginUserDTO,
  LoginResponseDTO,
  ApiResponse
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

// 2. Hook للحذف (DELETE)
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      axiosDelete<ApiResponse<null>>(`/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};