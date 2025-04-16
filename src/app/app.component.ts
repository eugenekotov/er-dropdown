import { Component } from '@angular/core';
import { Car, DataService } from './services/data.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'er-dropdown';

  cars: Car[] = [];
  emptyItem: Car = {
      name: '<unselect>',
      color: ''
  };
  selectedCar: Car | undefined;
  carName: string = "";
  carColor: string = "";

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.dataService.getData().subscribe(data => this.cars = [...data]);
  }

  onAddItemClick() {
    this.dataService.add({
      name: this.carName,
      color: this.carColor
    });
    this.getData();
  }

  onRemoveItemClick() {
    if (this.selectedCar) {
      this.dataService.remove(this.selectedCar);
    }
    this.getData();
    this.selectedCar = undefined;
  }

}
