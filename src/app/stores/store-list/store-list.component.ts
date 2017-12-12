import {Component, OnInit, OnDestroy, Input} from '@angular/core';
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
  @Input() cityStores: Store[];

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
            console.log(JSON.stringify(store));
          }
        }
      );
    this.cityStores != null ? this.stores = this.cityStores : this.dataStorageService.getStores();
    console.log('stores after citystore check: ' + JSON.stringify(this.stores));

    this.route.queryParams
      .filter(params => params.firstLetter)
      .subscribe(params => {
        console.log(params);

        if (this.cityStores != null) {
          console.log('getting stores through filter');
          // console.log('st starts with h: ' + store.title.startsWith(params.firstLetter));
          this.stores = this.cityStores.filter((store) => {
            console.log('st starts with h: ' + store.title.startsWith(params.firstLetter));
            return store.title.startsWith(params.firstLetter);

          });

          console.log(JSON.stringify('stores after filter check: ' + this.stores));
        } else {
          console.log('getting stores through dataservice');
          this.dataStorageService.getStores(params.firstLetter);
        }

      });


  }


  onNewStore() {
    this.router.navigate(['/stores/new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription != null ? this.subscription.unsubscribe() : null;
  }

}
