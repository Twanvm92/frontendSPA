import { Component, OnInit } from '@angular/core';
import {Beer} from "../../models/beer.model";
import {BeerService} from "../beer.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";
import {Subscription} from "rxjs";
import {Location} from '@angular/common';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements OnInit {
  beer: Beer;
  id: string;
  subscription: Subscription;

  constructor(private beerService: BeerService,
              private route: ActivatedRoute,
              private router: Router,
              private storageService: DataStorageService,
              private location: Location) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.beer = this.beerService.getBeer(this.id);

          this.subscription = this.beerService.beerChanged
            .subscribe((beer:Beer) => {
              this.beer = beer;
            });

          this.storageService.getBeer(this.id);
        }
      );
  }

  onEditBeer() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onBack() {
    this.location.back();
  }

  onDeleteBeer() {
    this.storageService.deleteBeer(this.id);
    this.router.navigate(['/beers']);
  }

}
