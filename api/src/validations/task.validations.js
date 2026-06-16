import * as z from 'zod';

import { StatusTask } from '../types/StatusTask.enum.js';

const statusTaskEnum = z.enum(Object.values(StatusTask));

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: statusTaskEnum.optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: statusTaskEnum.optional(),
});

export const getTaskSchema = z.object({
  id: z.string().min(1),
});

export const deleteTaskSchema = z.object({
  id: z.string().min(1),
});

export const getTasksQuerySchema = z.object({
  status: statusTaskEnum.optional(),
});