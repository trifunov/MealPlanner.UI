import { Component, OnInit } from '@angular/core';
import { CommonName } from '../../shared/models/common-name';
import { Meal } from '../../shared/models/meal';
import { MealService } from '../../shared/services/meal.service';

@Component({
  selector: 'app-meal-createedit',
  templateUrl: './createedit.component.html',
  styleUrls: ['./createedit.component.css']
})
export class CreateeditComponent implements OnInit {

  showCreateEditPopUpById: number;
  successfulSave: boolean;

  name: string = "";
  nameForeign: string = "";
  imageBase64: string = "";
  ingredients: CommonName[];
  allergens: CommonName[];
  initIngredients: CommonName[];
  initAllergens: CommonName[];

  constructor(private mealService: MealService) {
    this.mealService.showCreateEditPopUpById.subscribe(data => {
      this.showCreateEditPopUpById = data;
    });

    this.mealService.mealToEditObs.subscribe(data => {
      this.name = data.name;
      this.nameForeign = data.nameForeign;
      this.imageBase64 = data.imageBase64;
      this.ingredients = data.ingredients;
      this.allergens = data.allergens;
    });

    this.mealService.ingredientGetAllObs.subscribe((data) => {
      this.initIngredients = data;
    });

    this.mealService.allergenGetAllObs.subscribe((data) => {
      this.initAllergens = data;
    });
  }

  ngOnInit(): void {
    this.successfulSave = false;
    this.mealService.getAllIngredients();
    this.mealService.getAllAllergens();
  }

  proceed(toSave: boolean) {
    if (toSave === true) {
      var meal = new Meal();
      meal.id = this.showCreateEditPopUpById;
      meal.name = this.name;
      meal.nameForeign = this.nameForeign;
      meal.imageBase64 = this.imageBase64;
      meal.ingredients = this.ingredients;
      meal.allergens = this.allergens;

      if (this.showCreateEditPopUpById == 0) {
        this.mealService.create(meal).subscribe(data => {
          //this.successfulSave = true;
          this.mealService.getAll(1, 20);
        });
      }
      else {
        this.mealService.edit(meal).subscribe(data => {
          //this.successfulSave = true;
          this.mealService.getAll(1, 20);
        });
      }
    }

    this.mealService.showCreateEditPopUpById.next(-1);
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const allowed_types = ['image/png', 'image/jpeg'];

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        return false;
      }

      const file = fileInput.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.imageBase64 = reader.result.toString();
      };
    }
  }

  addIngredient() {
    var ingredient = new CommonName();
    ingredient.id = 0;
    ingredient.name = '';
    ingredient.nameForeign = '';
    this.ingredients.push(ingredient);
  }

  removeIngredient(index) {
    this.ingredients.splice(index,1);
  }

  addAllergen() {
    var allergen = new CommonName();
    allergen.id = 0;
    allergen.name = '';
    allergen.nameForeign = '';
    this.allergens.push(allergen);
  }

  removeAllergen(index) {
    this.allergens.splice(index, 1);
  }

  onChangeIngredient(ingredient, index) {
    if (ingredient == null) {
      this.ingredients[index].nameForeign = "";
    }
    else {
      this.ingredients[index].nameForeign = ingredient.nameForeign;
    }
  }

  onChangeAllergen(allergen, index) {
    if (allergen == null) {
      this.allergens[index].nameForeign = "";
    }
    else {
      this.allergens[index].nameForeign = allergen.nameForeign;
    }
  }
}
