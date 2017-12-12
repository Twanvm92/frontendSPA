import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';

@Component({
  selector: 'app-letter-filter',
  templateUrl: './letter-filter.component.html',
  styleUrls: ['./letter-filter.component.css']
})
export class LetterFilterComponent implements OnInit {
  filterElements: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z'];

  constructor() { }

  ngOnInit() {
  }

}
