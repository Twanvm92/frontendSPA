import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {DataStorageService} from "../../shared/data-storage.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {CityService} from "../city.service";

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {
  id: string;
  editMode = false;
  cityForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private cityService: CityService,
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
      const city = this.cityService.getCity(this.id);
      cityId = city._id;
      title = city.title;
      description = city.description;
      province = city.province;
      imagePath = city.imagePath;
    }

    this.cityForm = new FormGroup({
      '_id': new FormControl(cityId),
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'province': new FormControl(province, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
    });
  }

}
