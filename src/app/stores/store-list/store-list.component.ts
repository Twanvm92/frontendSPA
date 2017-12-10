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
    this.subscription = this.storeService.storesChanged
      .subscribe(
        (stores: Store[]) => {
          this.stores = stores;

          for(let store of stores) {
            console.log("id: " + store._id);
          }
        }
      );

    this.dataStorageService.getStores();
  }


  onNewStore() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
