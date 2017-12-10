import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Store} from "../models/store.model";
/**
 * Created by twanv on 6-12-2017.
 */
@Injectable()
export class StoreService {
  storesChanged = new Subject<Store[]>();

  private stores: Store[] = [];

  constructor() {
  }


  getStore(id: string) {
    const index = this.stores.findIndex(x => x._id == id);
    return this.stores[index];
  }

  setStores(cities: Store[]) {
    this.stores = cities;
    this.storesChanged.next(this.stores.slice());
  }

  addStore(city: Store) {
    this.stores.push(city);
    this.storesChanged.next(this.stores.slice());
  }


  updateStore(newStore: Store) {
    const index = this.stores.findIndex(x => x._id == newStore._id);
    this.stores[index] = newStore;
    this.storesChanged.next(this.stores.slice());
  }

  deleteStore(id: string) {
    const index = this.stores.findIndex(x => x._id == id);
    this.stores.splice(index, 1);
    this.storesChanged.next(this.stores.slice());
  }
}
