import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from "../../models/store.model";
import {Subscription} from "rxjs";
import {StoreService} from "../store.service";
import {Router, ActivatedRoute} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-store-list',
  templateUrl: 'store-list.component.html',
  styleUrls: ['store-list.component.css']
})
export class StoreListComponent implements OnInit, OnDestroy {
  stores: Store[];
  subscription: Subscription;

  constructor(private storeService: StoreService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.firstLetter)
      .subscribe(params => {
        console.log(params);

        this.dataStorageService.getStores(params.firstLetter);
      });

    this.subscription = this.storeService.storesChanged
      .subscribe(
        (stores: Store[]) => {
          this.stores = stores;

          for(let store of stores) {
            console.log(JSON.stringify(store));
          }
        }
      );

    console.log("getting new stores");
    this.dataStorageService.getStores();
  }


  onNewStore() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
