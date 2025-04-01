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

  private cars: Car[] = [];

  constructor() {
    this.cars.push({ name: '15', color: 'Color 1' });
    this.cars.push({ name: '12', color: 'Color 2' });
    this.cars.push({ name: '123', color: 'Color 3' });
    this.cars.push({ name: '1234', color: 'Color 4' });
    this.cars.push({ name: '1235', color: 'Color 5' });
    this.cars.push({ name: '1236', color: 'Color 6' });
    this.cars.push({ name: '12357', color: 'Color 7' });
    this.cars.push({ name: '231458', color: 'Color 8' });
    this.cars.push({ name: '234159', color: 'Color 9' });
    this.cars.push({ name: '23401', color: 'Color 10' });
    this.cars.push({ name: '2', color: 'Color 11' });

   }

  public getData(): Observable<Car[]> {
    return of(this.cars);
  }

}
