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
  storeSubscription: Subscription;
  citySubscription: Subscription;
  selectedOption = [];
  stores= [];
  city: City;
  allowedProvinces = ['Groningen', 'Friesland', 'Drenthe', 'Overijssel', 'Flevoland', 'Gelderland', 'Utrecht',
    'Noord-Holland', 'Zuid-Holland', 'Noord-Brabant', 'Zeeland', 'Limburg'];

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

    this.storeSubscription = this.storeService.storesChanged
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

    if (this.editMode) {

      this.citySubscription = this.cityService.cityChanged
        .subscribe((city:City) => {
          this.city = city;
          cityId = this.city._id;
          title = this.city.title;
          description = this.city.description;
          province = this.city.province;
          imagePath = this.city.imagePath;

          (<FormControl>this.cityForm.get('_id')).setValue(cityId);
          (<FormControl>this.cityForm.get('title')).setValue(title);
          (<FormControl>this.cityForm.get('description')).setValue(description);
          (<FormControl>this.cityForm.get('imagePath')).setValue(imagePath);
          (<FormControl>this.cityForm.get('province')).setValue(province);
        });

      this.dataStorageService.getCity(this.id);

    }

    this.cityForm = new FormGroup({
      '_id': new FormControl(cityId),
      'title': new FormControl(title, [Validators.required,
        Validators.minLength(3), Validators.maxLength(20)]),
      'description': new FormControl(description, [Validators.required,
        Validators.minLength(5), Validators.maxLength(200)]),
      'province': new FormControl(province, [Validators.required,
        Validators.minLength(7), Validators.maxLength(13),
        this.forbiddenProvince.bind(this)]),
      'imagePath': new FormControl(imagePath),
      'stores': new FormControl(this.stores)
    });
  }

  forbiddenProvince(control: FormControl): {[s: string]: boolean} {
    if (this.allowedProvinces.indexOf(control.value) === -1) {
      return {'provinceIsForbidden': true};
    }
    return null;
  }

}
