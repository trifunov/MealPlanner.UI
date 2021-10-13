import { Component, OnInit } from '@angular/core';
import { MealService } from '../../shared/services/meal.service';

@Component({
  selector: 'app-meal-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  showDeletePopUpById: number;
  successfulDelete: boolean;

  constructor(private mealService: MealService) {
    this.mealService.showDeletePopUpById.subscribe((data) => {
      this.showDeletePopUpById = data;
    });
  }

  ngOnInit(): void {
  }

  proceed(toDelete: boolean) {
    if (toDelete === true) {
      this.mealService.delete(this.showDeletePopUpById).subscribe(data => {
        //this.successfulDelete = true;
        this.mealService.getAll(1, 20, true);
      });
    }
    this.mealService.showDeletePopUpById.next(0);
  }

}
