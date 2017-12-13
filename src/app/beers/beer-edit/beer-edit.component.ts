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
    if (this.editMode) {
      this.dataStorageService.updateBeer(this.beerForm.value);
    } else {
      const str = JSON.stringify(this.beerForm.value);
      console.log(str);
      this.dataStorageService.addBeer(this.beerForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['beers']);
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
      'brand': new FormControl(beerBrand, Validators.required),
      'brewery': new FormControl(beerBrewery, Validators.required),
      'kind': new FormControl(beerKind, Validators.required),
      'percentage': new FormControl(beerPercentage, Validators.required),
      'imagePath': new FormControl(beerImagePath, Validators.required),
    });
  }

}
