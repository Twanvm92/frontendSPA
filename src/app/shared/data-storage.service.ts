/**
 * Created by twanv on 24-11-2017.
 */
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment'
import 'rxjs/add/operator/map'
import {BeerService} from "../beers/beer.service";
import {Beer} from "../models/beer.model";
import {City} from "../models/city.model";
import {CityService} from "../cities/city.service";
import {Store} from "../models/store.model";
import {StoreService} from "../stores/store.service";
import {isUndefined} from "util";
import {HttpParams} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataStorageService {

    // used this because we HAVE to use promises..
    private cities: City[];
    private beersServerUrl = environment.serverUrl + '/beers/'; // URL to web api
    private citiesServerUrl = environment.serverUrl + '/cities/'; // URL to web api
    private storesServerUrl = environment.serverUrl + '/stores/'; // URL to web api


    constructor(private http: HttpClient,
                private beerService: BeerService, private cityService: CityService,
                private storeService: StoreService) {
    }

    // used to handle errors throw by promises used in CRUD for stores
    // this so promises are at least used once.
    private handleError(error: any): Promise<any> {
      console.log('handleError');
      return Promise.reject(error.message || error);
    }

//------------------------Beers-----------------------------//
    getBeers() {
      this.http.get(this.beersServerUrl)
        .map(
          (response: Beer[]) => {
            const beers: Beer[] = response;
            for (let beer of beers) {
              if (!beer['stores']) {
                beer['stores'] = [];
              }
            }
            return beers;
          }
        )
        .subscribe(
          (beers: Beer[]) =>
            this.beerService.setBeers(beers)
        );
    }

  getBeer(beerId: string) {
    this.http.get(this.beersServerUrl + beerId)
      .map(
        (response: Beer) => {
          const beer: Beer = response;

          if (!beer['beers']) {
            beer['beers'] = [];
          }
          return beer;
        }
      )
      .subscribe(
        (beer: Beer) =>
          this.beerService.setBeer(beer)
      );
  }

    addBeer(beer: Beer) {
      this.http.post('http://localhost:3000/api/v1/beers', beer)
        .map(
          (response) => {
            console.log(response);
            return response;
          }
        )
        .subscribe(
          (beer: Beer) => {
            const str = JSON.stringify(beer);
            console.log(str);
            this.beerService.addBeer(beer);
          }
        );
    }

    updateBeer(beer: Beer) {
      this.http.put(this.beersServerUrl + beer._id, beer)
        .map(
          (response) => {
            return response;
          }
        )
        .subscribe(
          (beer: Beer) => {
            this.beerService.updateBeer(beer);
          }
        );
    }

    deleteBeer(id: string) {
      this.http.delete(this.beersServerUrl + id)
        .map(
          (response) => {
            return response;
          }
        )
        .subscribe(
          (beer: Beer) => {
            this.beerService.deleteBeer(beer._id);
          }
        );
    }

//------------------------Cities-----------------------------//
  getCities(firstLetter?: string) {

    if (isUndefined(firstLetter))
      firstLetter = '';

    let params = new HttpParams();
    params = params.append('firstLetter', firstLetter);


    this.http.get(this.citiesServerUrl, {params: params})
      .map(
        (response: City[]) => {
          const cities: City[] = response;
          for (let city of cities) {
            if (!city['stores']) {
              city['stores'] = [];
            }
          }
          return cities;
        }
      )
      .subscribe(
        (cities: City[]) =>
          this.cityService.setCities(cities)
      );
  }

  getCity(cityId: string) {
    this.http.get(this.citiesServerUrl + cityId)
      .map(
        (response: City) => {
          const city: City = response;

            if (!city['stores']) {
              city['stores'] = [];
            }
          return city;
        }
      )
      .subscribe(
        (city: City) =>
          this.cityService.setCity(city)
      );
  }

  addCity(city: City) {
    this.http.post(this.citiesServerUrl, city)
      .map(
        (response) => {
          return response;
        }
      )
      .subscribe(
        (city: City) => {
          const str = JSON.stringify(city);
          console.log(str);
          this.cityService.addCity(city);
        }
      );
  }

  updateCity(city: City) {
    this.http.put(this.citiesServerUrl + city._id, city)
      .map(
        (response) => {
          return response;
        }
      )
      .subscribe(
        (city: City) => {
          this.cityService.updateCity(city);
        }
      );
  }

  deleteCity(id: string) {
    this.http.delete(this.citiesServerUrl + id)
      .map(
        (response) => {
          return response;
        }
      )
      .subscribe(
        (city: City) => {
          this.cityService.deleteCity(city._id);
        }
      );
  }

//------------------------Stores-----------------------------//
  // used this because we HAVE to use promises..
  public getStores(firstLetter?: string): Promise<Store[]> {

    if (isUndefined(firstLetter))
      firstLetter = '';

    let params = new HttpParams();
    params = params.append('firstLetter', firstLetter);

    return this.http.get(this.storesServerUrl, {params: params})
      .toPromise()
      .then((response: Store[]) => {
        let stores:Store[] = response;
        for (let store of stores) {
          if (!store['beers']) {
            store['beers'] = [];
          }
        }

        this.storeService.setStores(stores);
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getStore(storeId: string) {
    this.http.get(this.storesServerUrl + storeId)
      .map(
        (response: Store) => {
          const store: Store = response;

          if (!store['beers']) {
            store['beers'] = [];
          }
          return store;
        }
      )
      .subscribe(
        (store: Store) =>
          this.storeService.setStore(store)
      );
  }

  public addStore(store: Store): Promise<Store> {
    console.log('items ophalen van server');
    return this.http.post(this.storesServerUrl, store)
      .toPromise()
      .then((response: Store) => {
        let store:Store = response;
        this.storeService.addStore(store);
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public updateStore(store: Store): Promise<Store> {
    console.log('items ophalen van server');
    return this.http.put(this.storesServerUrl + store._id, store)
      .toPromise()
      .then((response: Store) => {
        let store:Store = response;
        this.storeService.updateStore(store);
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public deleteStore(id: string): Promise<Store> {
    console.log('items ophalen van server');
    return this.http.delete(this.storesServerUrl + id)
      .toPromise()
      .then((response: Store) => {
        let store:Store = response;
        this.storeService.deleteStore(store._id);
      })
      .catch(error => {
        return this.handleError(error);
      });
  }


}

