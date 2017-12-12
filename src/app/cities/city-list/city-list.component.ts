import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataStorageService} from "../../shared/data-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CityService} from "../city.service";
import {City} from "../../models/city.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit, OnDestroy {
  cities: City[];
  subscription: Subscription;

  constructor(private cityService: CityService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.firstLetter)
      .subscribe(params => {
        console.log(params);

        this.dataStorageService.getCities(params.firstLetter);
      });

    this.subscription = this.cityService.citiesChanged
      .subscribe(
        (cities: City[]) => {
          this.cities = cities;

          for(let city of cities) {
            console.log("id: " + city._id);
          }
        }
      );

    this.dataStorageService.getCities();
  }

  onLetterClicked(letter: string) {
    console.log('letter city-list-component: ' + letter);
    this.dataStorageService.getCities(letter);
  }

  onNewCity() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
