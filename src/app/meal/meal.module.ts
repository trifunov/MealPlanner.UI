import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMealComponent } from './list/list.component';
import { CreateeditComponent } from './createedit/createedit.component';
import { FormsModule } from '@angular/forms';
import { MealService } from '../shared/services/meal.service';
import { DeleteComponent } from './delete/delete.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';


@NgModule({
  declarations: [ListMealComponent, CreateeditComponent, DeleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    NgOptionHighlightModule 
  ],
  providers: [MealService],
  bootstrap: [ListMealComponent]
})
export class MealModule { }
