import {Component, OnInit, Input} from '@angular/core';
import {Beer} from "../../../models/beer.model";

@Component({
  selector: 'app-bier-item',
  templateUrl: './bier-item.component.html',
  styleUrls: ['./bier-item.component.css']
})
export class BierItemComponent implements OnInit {
  @Input() beer: Beer;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
