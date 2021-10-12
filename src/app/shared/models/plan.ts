import { Meal } from "./meal";

export class Plan {
  ids: number[];
  shifts: number[];
  shiftNames: string[];
  editableFrom: string;
  editableTo: string;
  date: string;
  companyId: number;
  mealIds: number[];
  meals: Meal[];
}
