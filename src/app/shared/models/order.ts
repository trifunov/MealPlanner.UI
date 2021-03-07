import { Meal } from './meal';

export class Order {
  id: number;
  date: string;
  isDelivered: boolean;
  shift: number;
  mealId: number;
  meal: Meal;
  employeeId: number;
}
