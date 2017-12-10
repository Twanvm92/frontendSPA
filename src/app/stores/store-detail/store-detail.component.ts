import { Component, OnInit } from '@angular/core';
import {Store} from "../../models/store.model";
import {StoreService} from "../store.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {
  store: Store;
  id: string;

  constructor(private storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router,
              private storageService: DataStorageService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.store = this.storeService.getStore(this.id);
        }
      );
  }

  onEditCity() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCity() {
    this.storageService.deleteStore(this.id);
    this.router.navigate(['/stores']);
  }

}
