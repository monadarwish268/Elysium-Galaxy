export interface IActivity {
  id: string;
  planetId: string;
  title: string;
  description: string;
  type: string;
  durationMin?: number | null;
  createdAt?: string;
}

export type CreateActivityDTO = Omit<IActivity, 'id' | 'createdAt'>;