import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../shared/services/notifier.service';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit {

  show: boolean = false;
  notificationType: string = 'success';
  message: string = '';

  constructor(private notifierService: NotifierService) {
    this.notifierService.notificationConfig.subscribe((data) => {
      if (data.type === '') {
        this.show = false;
      }
      else {
        this.show = true;
        this.notificationType = data.type;
        this.message = data.message;
        setTimeout(() => {
          this.show = false;
        }, 2999);
      }
    });
  }

  ngOnInit(): void {
  }

}
