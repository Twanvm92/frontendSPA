import {Injectable} from "@angular/core";
import {Subject} from 'rxjs/Subject';
import {Store} from "../models/store.model";
/**
 * Created by twanv on 6-12-2017.
 */
@Injectable()
export class StoreService {
  storesChanged = new Subject<Store[]>();
  storeChanged = new Subject<Store>();

  private stores: Store[] = [];
  private store: Store;

  constructor() {
  }


  getStore(id: string) {
    const index = this.stores.findIndex(x => x._id == id);
    return this.stores[index];
  }

  setStores(stores: Store[]) {
    this.stores = stores;
    this.storesChanged.next(this.stores.slice());
  }

  setStore(store: Store) {
    console.log("storeservice: " + JSON.stringify(store));
    this.store = store;
    this.storeChanged.next(this.store);
  }

  addStore(store: Store) {
    this.stores.push(store);
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
