import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {City} from "../models/city.model";
/**
 * Created by twanv on 6-12-2017.
 */

@Injectable()
export class CityService {
  citiesChanged = new Subject<City[]>();
  cityChanged = new Subject<City>();

  private cities: City[] = [];
  private city: City;

  constructor() {
  }


  getCity(id: string) {
    const index = this.cities.findIndex(x => x._id == id);
    return this.cities[index];
  }

  setCity(city: City) {
    this.city = city;
    this.cityChanged.next(this.city);
  }

  setCities(cities: City[]) {
    this.cities = cities;
    this.citiesChanged.next(this.cities.slice());
  }

  addCity(city: City) {
    this.cities.push(city);
    this.citiesChanged.next(this.cities.slice());
  }


  updateCity(newCity: City) {
    const index = this.cities.findIndex(x => x._id == newCity._id);
    this.cities[index] = newCity;
    this.citiesChanged.next(this.cities.slice());
  }

  deleteCity(id: string) {
    const index = this.cities.findIndex(x => x._id == id);
    this.cities.splice(index, 1);
    this.citiesChanged.next(this.cities.slice());
  }
}
