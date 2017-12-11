import { Component, OnInit } from '@angular/core';
import {Store} from "../../models/store.model";
import {StoreService} from "../store.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {
  store: Store;
  id: string;
  subscription: Subscription;

  constructor(private storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router,
              private storageService: DataStorageService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

          this.subscription = this.storeService.storeChanged
            .subscribe((store:Store) => {
              this.store = store;
            });

          this.storageService.getStore(this.id);
        }
      );
  }

  onEditStore() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteStore() {
    this.storageService.deleteStore(this.id);
    this.router.navigate(['/stores']);
  }

}
