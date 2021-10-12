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
  itemsPerPage: number = 20;
  allPages: number = 0;

  constructor(private mealService: MealService) {
    this.mealService.mealGetAllObs.subscribe((data) => {
      this.meals = data.meals;
      this.allPages = Math.ceil(data.totalRows / this.itemsPerPage);
    });
  }

  ngOnInit(): void {
    this.mealService.getAll(1, this.itemsPerPage);
  }

  create() {
    this.mealService.setMealForCreate();
  }

  edit(id: number) {
    this.mealService.getById(id);
  }

  delete(id: number) {
    this.mealService.showDeletePopUpById.next(id);
  }

  onPageChange(page: number = 1): void {
    this.mealService.getAll(page, this.itemsPerPage);
  }
}
