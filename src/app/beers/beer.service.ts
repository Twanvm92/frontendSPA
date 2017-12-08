import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Beer} from "../models/beer.model";
/**
 * Created by twanv on 6-12-2017.
 */
@Injectable()
export class BeerService {
  beersChanged = new Subject<Beer[]>();

  private beers: Beer[] = [

  ];

  constructor() {}

  getBeers() {
    return this.beers.slice();
  }

  getBeer(id: string) {
    const index = this.beers.findIndex(x => x._id == id);
    return this.beers[index];
  }

  setBeers(beers: Beer[]) {
    this.beers = beers;
    this.beersChanged.next(this.beers.slice());
  }

  addBeer(beer: Beer) {
    this.beers.push(beer);
    this.beersChanged.next(this.beers.slice());
  }


  updateBeer(newBeer: Beer) {
    const index = this.beers.findIndex(x => x._id == newBeer._id);
    this.beers[index] = newBeer;
    this.beersChanged.next(this.beers.slice());
  }

  deleteBeer(id: string) {
    const index = this.beers.findIndex(x => x._id == id);
    this.beers.splice(index, 1);
    this.beersChanged.next(this.beers.slice());
  }
}
