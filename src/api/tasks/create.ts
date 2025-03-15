import { ResponseSchema } from '@/types/common';
import { Task } from '@/types/task';
import { api } from '../base';

export async function createTask(values: Omit<Task, 'id'>) {
  const response = await api.post<ResponseSchema<Task>>('/task', values);
  return response.data.data;
}
