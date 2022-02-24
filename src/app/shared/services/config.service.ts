import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  _apiURI: string;

  constructor() {
    this._apiURI = 'https://api.dalma.com.mk/api';
    //this._apiURI = 'http://mealplannerapi.azurewebsites.net/api';
    //this._apiURI = 'https://localhost:44316/api';   
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

  getRoles() {
    return [{
      id: '',
      name: ''
    }, {
      id: 'Administrator',
      name: 'Администратор'
    }, {
      id: 'HR',
      name: 'HR'
    }, {
      id: 'Manager',
      name: 'Менаџер'
    }, {
      id: 'Chef',
      name: 'Кантина'
    }];
  }

  convertRoleIdToName(roleId) {
    var roles = this.getRoles();

    for (var i = 0; i < roles.length; i++) {
      if (roles[i].id == roleId) {
        return roles[i].name;
      }
    }

    return '';
  }
}
