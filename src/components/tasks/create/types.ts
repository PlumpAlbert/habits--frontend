import { z } from 'zod';

export enum EDifficulty {
  Trivial = 0,
  Easy,
  Medium,
  Hard,
}

export const TaskSchema = z.object({
  id: z.number().nonnegative().int(),
  title: z.string().min(3).max(256),
  description: z.string().optional(),
  difficulty: z.nativeEnum(EDifficulty),
});

export const DifficultyValues = [
  EDifficulty.Trivial,
  EDifficulty.Easy,
  EDifficulty.Medium,
  EDifficulty.Hard,
];
