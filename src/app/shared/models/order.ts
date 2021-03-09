import { Plan } from './plan';

export class Order {
  id: number;
  isDelivered: boolean;
  shift: number;
  planId: number;
  plan: Plan;
  employeeId: number;
}
