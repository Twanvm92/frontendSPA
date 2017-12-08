/**
 * Created by twanv on 6-12-2017.
 */
import { Store } from '../models/store.model';

export class City {
  public _id: string;
  public title: string;
  public description: string;
  public province: string;
  public imagePath: string;
  public stores: Store[];



  constructor(title: string, description: string, province: string, imagePath: string, stores: Store[], id?: string) {
    this._id = id || "";
    this.title = title;
    this.description = description;
    this.province = province;
    this.imagePath = imagePath;
    this.stores = stores;
  }
}
