import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Car {
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly STORAGE_KEY = "er-dropdown-demo";
  private cars: Car[] = [];

  constructor() {
    this.load();
    if (this.cars.length === 0) {
      this.createDefaultData();
    }
  }

  private createDefaultData() {
    this.cars.push({ name: 'Car 1', color: 'Color 1' });
    this.cars.push({ name: 'Car 2', color: 'Color 2' });
    this.cars.push({ name: 'Car 3', color: 'Color 3' });
    this.cars.push({ name: 'Car 4', color: 'Color 4' });
    this.cars.push({ name: 'Car 5', color: 'Color 5' });
    this.cars.push({ name: 'Car 6', color: 'Color 6' });
    this.cars.push({ name: 'Car 7', color: 'Color 7' });
  }

  public getData(): Observable<Car[]> {
    return of(this.cars);
  }

  private save() {
    const stringValue = JSON.stringify(this.cars);
    localStorage.setItem(this.STORAGE_KEY, stringValue);
  }

  public load() {
    const stringValue = localStorage.getItem(this.STORAGE_KEY);
    if (stringValue !== null) {
      this.cars = JSON.parse(stringValue);
    }
  }

  public add(car: Car) {
    this.cars.push(car);
    this.save();
  }

  public remove(car: Car) {
    const index = this.cars.findIndex(existsCar => existsCar === car);
    this.cars.splice(index, 1);
    this.save();
  }


}
