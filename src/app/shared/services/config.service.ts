import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  _apiURI: string;

  constructor() {
    this._apiURI = 'https://localhost:44316/api';
  }

  getApiURI() {
    return this._apiURI;
  }

  getUtcDate(date: Date) {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0
      )
    );
  }

  getShifts() {
    return [{
      id: 0,
      name: 'Прва смена'
    }, {
        id: 1,
        name: 'Втора смена'
      }, {
        id: 2,
        name: 'Трета смена'
      }, {
        id: 3,
        name: 'Администрација'
      }];
  }
}
