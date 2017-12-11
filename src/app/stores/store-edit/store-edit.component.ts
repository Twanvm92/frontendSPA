import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {StoreService} from "../store.service";
import {DataStorageService} from "../../shared/data-storage.service";
import {BeerService} from "../../beers/beer.service";
import {Subscription} from "rxjs";
import {Store} from "../../models/store.model";
import {Beer} from "../../models/beer.model";

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})
export class StoreEditComponent implements OnInit {
  id: string;
  editMode = false;
  storeForm: FormGroup;
  subscription: Subscription;
  selectedOption = [];
  beers= [];
  store: Store;

  constructor(private route: ActivatedRoute,
              private storeService: StoreService,
              private beerService: BeerService,
              private router: Router,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );

    this.subscription = this.beerService.beersChanged
      .subscribe(
        (beers: Beer[]) => {
          this.beers = beers;

          this.onSetSelectedBeers();

          for(let beer of beers) {
            console.log("id: " + beer._id);
          }
        }
      );

    this.dataStorageService.getBeers();
  }

  onSetSelectedBeers() {
    this.selectedOption = this.beers.filter(o1 => this.store.beers.some(o2 => o1._id === o2._id));
  }

  onSubmit() {
    if (this.editMode) {
      this.dataStorageService.updateStore(this.storeForm.value);
    } else {
      const str = JSON.stringify(this.storeForm.value);
      console.log(str);
      this.dataStorageService.addStore(this.storeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['stores']);
  }

  private initForm() {
    let id = '';
    let title = '';
    let address = '';
    let imagePath = '';

    if (this.editMode) {
      this.store = this.storeService.getStore(this.id);
      id = this.store._id;
      title = this.store.title;
      address = this.store.address;
      imagePath = this.store.imagePath;
    }

    this.storeForm = new FormGroup({
      '_id': new FormControl(id),
      'title': new FormControl(title, Validators.required),
      'address': new FormControl(address, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'beers': new FormControl(this.beers)
    });
  }

}
