import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BeersComponent} from "./beers/beers.component";
import {BeerListComponent} from "./beers/beer-list/beer-list.component";
import {BeerEditComponent} from "./beers/beer-edit/beer-edit.component";
import {BeerDetailComponent} from "./beers/beer-detail/beer-detail.component";
import {CitiesComponent} from "./cities/cities.component";
import {CityListComponent} from "./cities/city-list/city-list.component";
import {CityEditComponent} from "./cities/city-edit/city-edit.component";
import {CityDetailComponent} from "./cities/city-detail/city-detail.component";
import {StoresComponent} from "./stores/stores.component";
import {StoreListComponent} from "./stores/store-list/store-list.component";
import {StoreEditComponent} from "./stores/store-edit/store-edit.component";
import {StoreDetailComponent} from "./stores/store-detail/store-detail.component";

const appRoutes: Routes = [

  { path: '', redirectTo: '/beers', pathMatch: 'full' },
  { path: 'beers', component: BeersComponent, children: [
    { path: '', component: BeerListComponent },
    { path: 'new', component: BeerEditComponent },
    { path: ':id', component: BeerDetailComponent },
    { path: ':id/edit', component: BeerEditComponent },
  ]},
  { path: 'cities', component: CitiesComponent, children: [
    { path: '', component: CityListComponent },
    { path: 'new', component: CityEditComponent },
    { path: ':id', component: CityDetailComponent },
    { path: ':id/edit', component: CityEditComponent},
  ]},
  { path: 'stores', component: StoresComponent, children: [
    { path: '', component: StoreListComponent },
    { path: 'new', component: StoreEditComponent },
    { path: ':id', component: StoreDetailComponent },
    { path: ':id/edit', component: StoreEditComponent},
  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
