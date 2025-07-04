import {Recurrence} from '../contracts/recurrence';

export interface Income{
  id: string;
  name: string;
  amount: number;
  date: Date;
  recurrence: Recurrence,
  interval?: number | null;
  endDate?: Date | null;

  boardId: string
}
