import { Component, OnInit } from '@angular/core';
import { Meal } from '../../shared/models/meal';
import { MealService } from '../../shared/services/meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListMealComponent implements OnInit {

  meals: Meal[];

  constructor(private mealService: MealService) {
    this.mealService.mealGetAllObs.subscribe((data) => {
      this.meals = data;
    });
  }

  ngOnInit(): void {
    this.mealService.getAll();
  }

  create() {
    this.mealService.setCompanyForCreate();
  }

  //edit(id: number) {
  //  this.companyService.getCompanyByIdForEdit(id);
  //}

  delete(id: number) {
    this.mealService.showDeletePopUpById.next(id);
  }

}
