import {Component, OnInit, OnDestroy, Input, ViewContainerRef} from '@angular/core';
import {Subscription} from "rxjs";
import {Beer} from "../../models/beer.model";
import {Router, ActivatedRoute} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";
import {BeerService} from "../beer.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
              private dataStorageService: DataStorageService,
              private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.edited)
      .subscribe(params => {
        console.log(params);

        this.showSuccess('Beer has been edited!');
      });

    this.route.queryParams
      .filter(params => params.posted)
      .subscribe(params => {
        console.log(params);

        this.showSuccess('Beer has been posted!');
      });

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

  showSuccess(message: string) {
    this.toastr.success(message, 'Success!');
  }

  ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : null;
  }

}
