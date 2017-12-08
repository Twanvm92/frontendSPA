/**
 * Created by twanv on 6-12-2017.
 */
import { Store } from './store.model';

export class Beer {
  public _id: string;
  public brand: string;
  public brewery: string;
  public kind: string;
  public percentage: string;
  public imagePath: string;
  public stores: Store[];



  constructor(brand: string, brewery: string, kind: string, percentage: string,
              imagePath: string, stores: Store[], id?: string) {
    this._id = id || "";
    this.brand = brand;
    this.brewery = brewery;
    this.kind = kind;
    this.percentage = percentage;
    this.imagePath = imagePath;
    this.stores = stores;
  }
}
