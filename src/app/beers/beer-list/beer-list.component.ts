import {Component, OnInit, OnDestroy, Input} from '@angular/core';
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
  @Input() storeBeers: Beer[];

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

          if (this.storeBeers != null) {
            this.beers = this.beers.filter(o1 => this.storeBeers.some(o2 => o1._id === o2._id));
          }
        }
      );

    this.dataStorageService.getBeers();
  }

  onNewBeer() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
