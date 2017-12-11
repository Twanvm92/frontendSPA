/**
 * Created by twanv on 24-11-2017.
 */
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment'
import 'rxjs/add/operator/map'

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {BeerService} from "../beers/beer.service";
import {Beer} from "../models/beer.model";
import {City} from "../models/city.model";
import {CityService} from "../cities/city.service";
import {Store} from "../models/store.model";
import {StoreService} from "../stores/store.service";

@Injectable()
export class DataStorageService {

    // used this because we HAVE to use promises..
    private cities: City[];
    private serverUrl = environment.serverUrl + '/recipes/'; // URL to web api
    private beersServerUrl = environment.serverUrl + '/beers/'; // URL to web api
    private citiesServerUrl = environment.serverUrl + '/cities/'; // URL to web api
    private storesServerUrl = environment.serverUrl + '/stores/'; // URL to web api


    constructor(private http: Http, private recipeService: RecipeService,
                private beerService: BeerService, private cityService: CityService,
                private storeService: StoreService) {
    }

    // used to handle errors throw by promises used in CRUD for stores
    // this so promises are at least used once.
    private handleError(error: any): Promise<any> {
      console.log('handleError');
      return Promise.reject(error.message || error);
    }

    storeRecipes() {
        return this.http.put(this.serverUrl, this.recipeService.getRecipes());
    }

    getRecipes() {
        this.http.get(this.serverUrl)
            .map(
                (response) => {
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) =>
                    this.recipeService.setRecipes(recipes)
            );
    }

    addRecipe(recipe: Recipe) {
        this.http.post(this.serverUrl, recipe)
            .map(
                (response) => {
                    return response.json();
                }
            )
            .subscribe(
                (recipe: Recipe) => {
                    this.recipeService.addRecipe(recipe);
                }
            );
    }

    updateRecipe(recipe: Recipe) {
        this.http.put(this.serverUrl + recipe._id, recipe)
            .map(
                (response) => {
                    return response.json();
                }
            )
            .subscribe(
                (recipe: Recipe) => {
                    this.recipeService.updateRecipe(recipe);
                }
            );
    }

    deleteRecipe(id: string) {
        this.http.delete(this.serverUrl + id)
            .map(
                (response) => {
                    return response.json();
                }
            )
            .subscribe(
                (recipe: Recipe) => {
                    this.recipeService.deleteRecipe(recipe._id);
                }
            );
    }

//------------------------Beers-----------------------------//
    getBeers() {
      this.http.get(this.beersServerUrl)
        .map(
          (response) => {
            const beers: Beer[] = response.json();
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
        (response) => {
          const beer: Beer = response.json();

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
            console.log(response.json());
            return response.json();
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
            return response.json();
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
            return response.json();
          }
        )
        .subscribe(
          (beer: Beer) => {
            this.beerService.deleteBeer(beer._id);
          }
        );
    }

//------------------------Cities-----------------------------//
  getCities() {
    this.http.get(this.citiesServerUrl)
      .map(
        (response) => {
          const cities: City[] = response.json();
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
        (response) => {
          const city: City = response.json();

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
          console.log(response.json());
          return response.json();
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
          return response.json();
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
          return response.json();
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
  public getStores(): Promise<Store[]> {
    console.log('items ophalen van server');
    return this.http.get(this.storesServerUrl)
      .toPromise()
      .then(response => {
        let stores:Store[] = response.json();
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
        (response) => {
          const store: Store = response.json();

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
      .then(response => {
        let store:Store = response.json();
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
      .then(response => {
        let store:Store = response.json();
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
      .then(response => {
        let store:Store = response.json();
        this.storeService.deleteStore(store._id);
      })
      .catch(error => {
        return this.handleError(error);
      });
  }


}

