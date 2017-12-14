import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {BeerService} from "../beer.service";
import {DataStorageService} from "../../shared/data-storage.service";
import {Subscription} from "rxjs";
import {Beer} from "../../models/beer.model";

@Component({
  selector: 'app-beer-edit',
  templateUrl: './beer-edit.component.html',
  styleUrls: ['./beer-edit.component.css']
})
export class BeerEditComponent implements OnInit {
  id: string;
  editMode = false;
  beerForm: FormGroup;
  beerSubscription: Subscription;
  beer: Beer;

  constructor(private route: ActivatedRoute,
              private beerService: BeerService,
              private router: Router,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    let queryParam: {[key: string]: boolean};

    if (this.editMode) {
      this.dataStorageService.updateBeer(this.beerForm.value);
      queryParam = {'edited': true};
    } else {
      const str = JSON.stringify(this.beerForm.value);
      console.log(str);
      this.dataStorageService.addBeer(this.beerForm.value);
      queryParam = {'posted': true};
    }
    this.onCancel(queryParam);
  }

  onCancel(queryParam: {[key: string]: boolean}) {
    this.router.navigate(['beers'], { queryParams: queryParam});
  }

  private initForm() {
    let beerId = '';
    let beerBrand = '';
    let beerBrewery = '';
    let beerKind = '';
    let beerPercentage = '';
    let beerImagePath = '';


    if (this.editMode) {

      this.beerSubscription = this.beerService.beerChanged
        .subscribe((beer:Beer) => {
          this.beer = beer;
          beerId = beer._id;
          beerBrand = beer.brand;
          beerBrewery = beer.brewery;
          beerKind = beer.kind;
          beerPercentage = beer.percentage;
          beerImagePath = beer.imagePath;

          (<FormControl>this.beerForm.get('_id')).setValue(beerId);
          (<FormControl>this.beerForm.get('brand')).setValue(beerBrand);
          (<FormControl>this.beerForm.get('brewery')).setValue(beerBrewery);
          (<FormControl>this.beerForm.get('kind')).setValue(beerKind);
          (<FormControl>this.beerForm.get('percentage')).setValue(beerPercentage);
          (<FormControl>this.beerForm.get('imagePath')).setValue(beerImagePath);
        });

      this.dataStorageService.getBeer(this.id);
    }

    this.beerForm = new FormGroup({
      '_id': new FormControl(beerId),
      'brand': new FormControl(beerBrand, [Validators.required,
        Validators.minLength(3), Validators.maxLength(25)]),
      'brewery': new FormControl(beerBrewery, [Validators.required,
        Validators.minLength(5), Validators.maxLength(25)]),
      'kind': new FormControl(beerKind, [Validators.required,
        Validators.minLength(3), Validators.maxLength(15)]),
      'percentage': new FormControl(beerPercentage, [Validators.required, Validators.pattern('\\d{1,2}(\\.\\d{0,2})?\%')]),
      'imagePath': new FormControl(beerImagePath),
    });
  }

}
