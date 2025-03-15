import { ResponseSchema } from '@/types/common';
import { Task } from '@/types/task';
import { api } from '../base';

export async function getTasks() {
  const response = await api.get<ResponseSchema<Task[]>>('/tasks');
  return response.data.data;
}
