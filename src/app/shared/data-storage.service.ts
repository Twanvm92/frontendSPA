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

@Injectable()
export class DataStorageService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private serverUrl = environment.serverUrl + '/recipes/'; // URL to web api
    private beersServerUrl = environment.serverUrl + '/beers/'; // URL to web api
    private citiesServerUrl = environment.serverUrl + '/cities/'; // URL to web api


    constructor(private http: Http, private recipeService: RecipeService,
                private beerService: BeerService, private cityService: CityService) {
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

}

