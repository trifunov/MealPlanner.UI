import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonName } from '../models/common-name';
import { Meal } from '../models/meal';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  baseUrl: string = '';

  public showDeletePopUpById = new BehaviorSubject(0);
  public showCreateEditPopUpById = new BehaviorSubject(-1);

  private mealToEditSource = new BehaviorSubject<Meal>({ id: -1, name: '', nameForeign: '', imageBase64: '', allergens: [], ingredients: [] });
  mealToEditObs = this.mealToEditSource.asObservable();

  private mealGetAllSource = new BehaviorSubject<Meal[]>([]);
  mealGetAllObs = this.mealGetAllSource.asObservable();

  private mealGetValidSource = new BehaviorSubject<Meal[]>([]);
  mealGetValidObs = this.mealGetValidSource.asObservable();

  private ingredientGetAllSource = new BehaviorSubject<CommonName[]>([]);
  ingredientGetAllObs = this.ingredientGetAllSource.asObservable();

  private allergenGetAllSource = new BehaviorSubject<CommonName[]>([]);
  allergenGetAllObs = this.allergenGetAllSource.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.getApiURI();
  }

  getAll() {
    return this.http.get<Meal[]>(this.baseUrl + "/meal/getall").subscribe(data => {
      this.mealGetAllSource.next(data);
    });
  }

  getValid(shift: number, date: string) {
    return this.http.get<Meal[]>(this.baseUrl + "/meal/getvalid?shift=" + shift + "&date=" + date).subscribe(data => {
      this.mealGetValidSource.next(data);
    });
  }

  getAllIngredients() {
    return this.http.get<Meal[]>(this.baseUrl + "/ingredient/getall").subscribe(data => {
      this.ingredientGetAllSource.next(data);
    });
  }

  getAllAllergens() {
    return this.http.get<Meal[]>(this.baseUrl + "/allergen/getall").subscribe(data => {
      this.allergenGetAllSource.next(data);
    });
  }

  create(meal: Meal) {
    return this.http.post(this.baseUrl + "/meal/add", meal);
  }

  edit(meal: Meal) {
    return this.http.post(this.baseUrl + "/meal/update", meal);
  }

  delete(id: number) {
    return this.http.get(this.baseUrl + "/meal/delete?id=" + id);
  }

  setCompanyForCreate() {
    var meal = new Meal();
    meal.id = 0;
    meal.name = '';
    meal.nameForeign = '';
    meal.imageBase64 = '';
    meal.ingredients = [];
    meal.allergens = [];

    this.mealToEditSource.next(meal);
    this.showCreateEditPopUpById.next(0);
  }
}
