import { Component, OnInit } from '@angular/core';
import {City} from "../../models/city.model";
import {DataStorageService} from "../../shared/data-storage.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {CityService} from "../city.service";

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {
  city: City;
  id: string;

  constructor(private cityService: CityService,
              private route: ActivatedRoute,
              private router: Router,
              private storageService: DataStorageService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.city = this.cityService.getCity(this.id);
        }
      );
  }

  onEditCity() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCity() {
    this.storageService.deleteCity(this.id);
    this.router.navigate(['/stores']);
  }

}
