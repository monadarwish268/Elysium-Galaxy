import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosGet, axiosPost, axiosDelete } from './axios';
import { IUser, CreateUserDTO } from '@/interfaces/UserInterface';

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => axiosGet<IUser[]>('/users'),
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser: CreateUserDTO) => axiosPost<CreateUserDTO, IUser>('/users', newUser),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};