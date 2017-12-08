import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Beer} from "../../models/beer.model";
import {Router, ActivatedRoute} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";
import {BeerService} from "../beer.service";

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit, OnDestroy {
  beers: Beer[];
  subscription: Subscription;

  constructor(private beerService: BeerService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {

    this.subscription = this.beerService.beersChanged
      .subscribe(
        (beers: Beer[]) => {
          this.beers = beers;

          for(let beer of beers) {
            console.log("id: " + beer._id);
          }
        }
      );

    this.dataStorageService.getBeers();
    // this.recipes = this.recipeService.getRecipes();
  }

  onNewBeer() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
