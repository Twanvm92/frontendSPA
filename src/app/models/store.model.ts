/**
 * Created by twanv on 6-12-2017.
 */
import {Beer} from "./beer.model";

export class Store {
  public _id: string;
  public title: string;
  public address: string;
  public imagePath: string;
  public beers: Beer[];



  constructor(title: string, address: string, imagePath: string, beers: Beer[], id?: string) {
    this._id = id || "";
    this.title = title;
    this.address = address;
    this.imagePath = imagePath;
    this.beers = beers;
  }
}
