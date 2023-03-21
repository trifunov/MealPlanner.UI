import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { DateShift } from '../../shared/models/date-shift';
import { ConfigService } from '../../shared/services/config.service';
import { MealService } from '../../shared/services/meal.service';

@Component({
  selector: 'app-date-shift-select',
  templateUrl: './date-shift-select.component.html',
  styleUrls: ['./date-shift-select.component.css']
})
export class DateShiftSelectComponent implements OnInit {

  dates = [];
  shifts = [];
  elementsToShow: number = 4;
  selectedDate: string;
  selectedShift: number;
  @Output() selectedDateShift = new EventEmitter<DateShift>();

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    if (window.screen) {
      if (screen.width < 768) {
        this.elementsToShow = 1;
      }
    }

    for (var i = 0; i < 20; i++) {
      var hiddenValue = false;
      if (i > this.elementsToShow) {
        hiddenValue = true;
      }
      this.dates.push({
        value: moment().locale('mk').add(i-1, 'days').format('YYYY-MM-DD'),
        label: moment().locale('mk').add(i-1, 'days').format('ddd DD MMM YY'),
        hidden: hiddenValue
      });
    }

    this.shifts = this.configService.getShifts();
  }

  selectDate(date) {
    this.selectedDate = date.value;
    this.selectedShift = -1;
    var dateShift = new DateShift();
    dateShift.date = this.selectedDate;
    dateShift.shift = this.selectedShift;
    this.selectedDateShift.emit(dateShift);
  }

  selectShift(shift) {
    this.selectedShift = shift.id;
    var dateShift = new DateShift();
    dateShift.date = this.selectedDate;
    dateShift.shift = this.selectedShift;
    this.selectedDateShift.emit(dateShift);
  }

  changeDates(days: number) {
    for (var i = 0; i < this.dates.length; i++) {
      if (this.dates[i].hidden === false && (days + i) >= 0 && (days + i) < this.dates.length) {
        this.generateHiddenDates(days, i);
        break;
      }
    }
  }

  generateHiddenDates(days: number, startingIndex: number) {
    this.dates = this.dates.map(function (val, index) {
      val.hidden = true;
      return val;
    });

    for (var i = 0; i < Math.abs(days); i++) {
      this.dates[startingIndex + days].hidden = false;
      startingIndex++;
    }
  }
}
