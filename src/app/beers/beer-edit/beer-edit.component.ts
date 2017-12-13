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
  subscription: Subscription;
  beerId: string = '';
  beerBrand: string = '';
  beerBrewery: string = '';
  beerKind: string = '';
  beerPercentage: string = '';
  beerImagePath: string = '';
  beerToEditLoaded: boolean = false;

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

          // if (this.editMode) {
            this.beerSubscription = this.beerService.beerChanged
              .subscribe({
                next: (beer: Beer) => {

                  // if editMode and beerToEditLoaded are both true, a beer has already been loaded once,
                  // so this must be a result from a put request.
                  if (this.editMode === true && this.beerToEditLoaded === true) {
                    this.onCancel();
                    // if editMode and BeerTeEditLoaded are both false, this must also be a post request
                    // for a new beer
                  } else if (this.editMode === false && this.beerToEditLoaded == false) {
                    this.onCancel();
                  }

                  this.beer = beer;
                  this.beerId = beer._id;
                  this.beerBrand = beer.brand;
                  this.beerBrewery = beer.brewery;
                  this.beerKind = beer.kind;
                  this.beerPercentage = beer.percentage;
                  this.beerImagePath = beer.imagePath;

                  // check if this is edit mode because this subscription will also be fired
                  // by a new post request
                  if (this.editMode) {
                    // make sure to set a boolean that keeps track of the first time that a beer has been loaded
                    // when this component is in editMode. This is important to handle to onCancel() method well
                    // after a successful post request.
                    this.beerToEditLoaded !== true ? this.beerToEditLoaded = true : null;

                    this.setNewFormValues();
                    this.dataStorageService.getBeer(this.id);
                  }
                },
                error: (error) => console.log("beer-edit error: " + error.error.error )
              });
          // }

        }
      );

  }

  onSubmit() {
    if (this.editMode) {
      this.dataStorageService.updateBeer(this.beerForm.value);
    } else {
      const str = JSON.stringify(this.beerForm.value);
      console.log(str);
      this.dataStorageService.addBeer(this.beerForm.value)

    }
    // this.onCancel();
  }

  onCancel() {
    this.router.navigate(['beers']);
  }

  private setNewFormValues () {
    (<FormControl>this.beerForm.get('_id')).setValue(this.beerId);
    (<FormControl>this.beerForm.get('brand')).setValue(this.beerBrand);
    (<FormControl>this.beerForm.get('brewery')).setValue(this.beerBrewery);
    (<FormControl>this.beerForm.get('kind')).setValue(this.beerKind);
    (<FormControl>this.beerForm.get('percentage')).setValue(this.beerPercentage);
    (<FormControl>this.beerForm.get('imagePath')).setValue(this.beerImagePath);
  }

  private initForm() {
    // let beerId = '';
    // let beerBrand = '';
    // let beerBrewery = '';
    // let beerKind = '';
    // let beerPercentage = '';
    // let beerImagePath = '';


    // if (this.editMode) {
    //
    //   this.beerSubscription = this.beerService.beerChanged
    //     .subscribe((beer:Beer) => {
    //       this.beer = beer;
    //       beerId = beer._id;
    //       beerBrand = beer.brand;
    //       beerBrewery = beer.brewery;
    //       beerKind = beer.kind;
    //       beerPercentage = beer.percentage;
    //       beerImagePath = beer.imagePath;
    //
    //       (<FormControl>this.beerForm.get('_id')).setValue(beerId);
    //       (<FormControl>this.beerForm.get('brand')).setValue(beerBrand);
    //       (<FormControl>this.beerForm.get('brewery')).setValue(beerBrewery);
    //       (<FormControl>this.beerForm.get('kind')).setValue(beerKind);
    //       (<FormControl>this.beerForm.get('percentage')).setValue(beerPercentage);
    //       (<FormControl>this.beerForm.get('imagePath')).setValue(beerImagePath);
    //     });
    //
    //   this.dataStorageService.getBeer(this.id);
    // }

    this.beerForm = new FormGroup({
      '_id': new FormControl(this.beerId),
      'brand': new FormControl(this.beerBrand, Validators.required),
      'brewery': new FormControl(this.beerBrewery, Validators.required),
      'kind': new FormControl(this.beerKind, Validators.required),
      'percentage': new FormControl(this.beerPercentage, Validators.required),
      'imagePath': new FormControl(this.beerImagePath, Validators.required),
    });
  }

}
