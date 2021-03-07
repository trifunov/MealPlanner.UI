import { CommonName } from './common-name';

export class Meal {
  id: number;
  name: string;
  nameForeign: string;
  imageBase64: string;
  ingredients: CommonName[];
  allergens: CommonName[];
}
