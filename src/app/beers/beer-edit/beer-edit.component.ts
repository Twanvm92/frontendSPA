import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {BeerService} from "../beer.service";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-beer-edit',
  templateUrl: './beer-edit.component.html',
  styleUrls: ['./beer-edit.component.css']
})
export class BeerEditComponent implements OnInit {
  id: string;
  editMode = false;
  cityForm: FormGroup;

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
      this.dataStorageService.updateBeer(this.cityForm.value);
    } else {
      const str = JSON.stringify(this.cityForm.value);
      console.log(str);
      this.dataStorageService.addBeer(this.cityForm.value);
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
      const beer = this.beerService.getBeer(this.id);
      beerId = beer._id;
      beerBrand = beer.brand;
      beerBrewery = beer.brewery;
      beerKind = beer.kind;
      beerPercentage = beer.percentage;
      beerImagePath = beer.imagePath;
    }

    this.cityForm = new FormGroup({
      '_id': new FormControl(beerId),
      'brand': new FormControl(beerBrand, Validators.required),
      'brewery': new FormControl(beerBrewery, Validators.required),
      'kind': new FormControl(beerKind, Validators.required),
      'percentage': new FormControl(beerPercentage, Validators.required),
      'imagePath': new FormControl(beerImagePath, Validators.required),
    });
  }

}
