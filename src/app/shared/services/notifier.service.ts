import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationConfig } from '../models/notification-config';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  public notificationConfig = new BehaviorSubject<NotificationConfig>({ type: '', message:'' });

  constructor() { }
}
