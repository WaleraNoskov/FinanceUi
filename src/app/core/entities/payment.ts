import {Recurrence} from '../contracts/recurrence';

export interface Payment{
  id: string;
  name: string;
  amount: number;
  date: Date;
  currency: Recurrence;

  boardId: string;
}
