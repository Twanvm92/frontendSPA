import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {DataStorageService} from "../../shared/data-storage.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {CityService} from "../city.service";
import {StoreService} from "../../stores/store.service";
import {Subscription} from "rxjs";
import {Store} from "../../models/store.model";
import {City} from "../../models/city.model";

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {
  id: string;
  editMode = false;
  cityForm: FormGroup;
  subscription: Subscription;
  selectedOption = [];
  stores= [];
  city: City;

  constructor(private route: ActivatedRoute,
              private cityService: CityService,
              private storeService: StoreService,
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

    this.subscription = this.storeService.storesChanged
      .subscribe(
        (stores: Store[]) => {
          this.stores = stores;

          this.onSetSelectedStores();

          for(let store of stores) {
            console.log("id: " + store._id);
          }
        }
      );

    this.dataStorageService.getStores();
  }

  onSetSelectedStores() {
    this.selectedOption = this.stores.filter(o1 => this.city.stores.some(o2 => o1._id === o2._id));
  }


  onSubmit() {
    if (this.editMode) {
      this.dataStorageService.updateCity(this.cityForm.value);
    } else {
      const str = JSON.stringify(this.cityForm.value);
      console.log(str);
      this.dataStorageService.addCity(this.cityForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['cities']);
  }

  private initForm() {
    let cityId = '';
    let title = '';
    let description = '';
    let province = '';
    let imagePath = '';
    let cityStores = new FormArray([]);

    if (this.editMode) {
      this.city = this.cityService.getCity(this.id);
      cityId = this.city._id;
      title = this.city.title;
      description = this.city.description;
      province = this.city.province;
      imagePath = this.city.imagePath;


      if (this.city['stores']) {
        for (let store of this.city.stores) {
          cityStores.push(
            new FormGroup({
              'title': new FormControl(store.title, Validators.required),
            })
          );
        }
      }
    }

    this.cityForm = new FormGroup({
      '_id': new FormControl(cityId),
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'province': new FormControl(province, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'stores': new FormControl(this.stores)
    });


  }

}
