import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Meal } from '../../shared/models/meal';
import { Plan } from '../../shared/models/plan';
import { ConfigService } from '../../shared/services/config.service';
import { MealService } from '../../shared/services/meal.service';
import { PlanService } from '../../shared/services/plan.service';

@Component({
  selector: 'app-plan-createedit',
  templateUrl: './createedit.component.html',
  styleUrls: ['./createedit.component.css']
})
export class CreateeditPlanComponent implements OnInit {

  ids: string;
  date: string;
  editableFrom: string;
  editableTo: string;
  meals: Meal[];
  mealIds: number[];
  shifts: number[];
  initShifts;
  datePickerConfig;

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private planService: PlanService, private configService: ConfigService, private mealService: MealService) {
    this.planService.planToEditObs.subscribe((data) => {
      this.date = moment(data.date).format('YYYY-MM-DD');
      this.editableFrom = moment(data.editableFrom).format('YYYY-MM-DD');
      this.editableTo = moment(data.editableTo).format('YYYY-MM-DD');
      this.mealIds = data.mealIds;
      this.shifts = data.shifts;
    });

    this.initShifts = this.configService.getShifts();

    this.mealService.mealGetAllObs.subscribe((data) => {
      this.meals = data.meals;
    });

    this.datePickerConfig = {
      format: 'YYYY-MM-DD'
    }
  }

  ngOnInit(): void {
    this.mealService.getAll(1, 20, false);
    this.ids = this.activatedRoute.snapshot.queryParamMap.get('ids');

    if (this.ids == '0') {
      this.prepareForCreatePlan();
    }
    else {
      this.planService.getByIds(this.ids.split(',').map(Number));
    }
  }

  changedMealSelection(selectedMeals: number[]) {
    this.mealIds = selectedMeals;
  }

  prepareForCreatePlan() {
    this.date = moment().format('YYYY-MM-DD');
    this.editableFrom = moment().format('YYYY-MM-DD');
    this.editableTo = moment().format('YYYY-MM-DD');
    this.mealIds = [];
    this.shifts = [];
  }

  proceed(toSave: boolean) {
    if (toSave === true) {
      var plan = new Plan();
      plan.ids = this.ids.split(',').map(Number);
      plan.date = this.date;
      plan.editableFrom = this.editableFrom;
      plan.editableTo = this.editableTo;
      plan.shifts = this.shifts;
      plan.mealIds = this.mealIds;

      if (this.ids == '0') {
        this.planService.create(plan).subscribe(data => {
          this.route.navigateByUrl('/plan/list');
        });
      }
      else {
        this.planService.edit(plan).subscribe(data => {
          this.route.navigateByUrl('/plan/list');
        });
      }
    }

    this.route.navigateByUrl('/plan/list');
  }
}
