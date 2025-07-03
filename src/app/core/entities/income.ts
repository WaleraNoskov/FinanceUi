import {Recurrence} from '../contracts/recurrence';

export interface Income{
  id: string;
  name: string;
  amount: number;
  date: Date;
  recurrence: Recurrence,
  interval?: number;
  endDate?: Date;

  boardId: string
}
