import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipes/recipe.service';
import {DataStorageService} from "./shared/data-storage.service";
import { AlertModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { StoresComponent } from './stores/stores.component';
import { StoreListComponent } from './stores/store-list/store-list.component';
import { LetterFilterComponent } from './shared/letter-filter/letter-filter.component';
import { StoreDetailComponent } from './stores/store-detail/store-detail.component';
import { StoreEditComponent } from './stores/store-edit/store-edit.component';
import { StoreItemComponent } from './stores/store-list/store-item/store-item.component';
import { CityListComponent } from './cities/city-list/city-list.component';
import { CitiesComponent } from './cities/cities.component';
import { CityDetailComponent } from './cities/city-detail/city-detail.component';
import { CityEditComponent } from './cities/city-edit/city-edit.component';
import { CityItemComponent } from './cities/city-list/city-item/city-item.component';
import { BeersComponent } from './beers/beers.component';
import { BeerDetailComponent } from './beers/beer-detail/beer-detail.component';
import { BeerListComponent } from './beers/beer-list/beer-list.component';
import { BierItemComponent } from './beers/beer-list/bier-item/bier-item.component';
import { BeerEditComponent } from './beers/beer-edit/beer-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    StoresComponent,
    StoreListComponent,
    LetterFilterComponent,
    StoreDetailComponent,
    StoreEditComponent,
    StoreItemComponent,
    CityListComponent,
    CitiesComponent,
    CityDetailComponent,
    CityEditComponent,
    CityItemComponent,
    BeersComponent,
    BeerDetailComponent,
    BeerListComponent,
    BierItemComponent,
    BeerEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [ShoppingListService, RecipeService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
