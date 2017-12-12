import { Component, OnInit } from '@angular/core';
import {City} from "../../models/city.model";
import {DataStorageService} from "../../shared/data-storage.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {CityService} from "../city.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {
  city: City;
  id: string;
  subscription: Subscription;
  isCollapsed: boolean = true;

  constructor(private cityService: CityService,
              private route: ActivatedRoute,
              private router: Router,
              private storageService: DataStorageService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

          this.subscription = this.cityService.cityChanged
            .subscribe((city:City) => {
              this.city = city;
            });

          this.storageService.getCity(this.id);
        }
      );
  }

  onEditCity() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCity() {
    this.storageService.deleteCity(this.id);
    this.router.navigate(['/cities']);
  }

}
