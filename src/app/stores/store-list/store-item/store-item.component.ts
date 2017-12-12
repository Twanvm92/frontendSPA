import {Component, OnInit, Input} from '@angular/core';
import {Store} from "../../../models/store.model";

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.css']
})
export class StoreItemComponent implements OnInit {
  @Input() store: Store;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
