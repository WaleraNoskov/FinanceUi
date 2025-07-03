import {Recurrence} from '../contracts/recurrence';

export interface Income{
  id: number;
  name: string;
  amount: number;
  date: Date;
  recurrence: Recurrence,
  interval?: number;
  endDate?: Date;
}
