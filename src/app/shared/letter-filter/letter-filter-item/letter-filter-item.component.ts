import {Component, OnInit, Output, ViewChild, EventEmitter, Input} from '@angular/core';
import {FilterDirectiveDirective} from "../../filter-directive/filter-directive.directive";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-letter-filter-item',
  templateUrl: './letter-filter-item.component.html',
  styleUrls: ['./letter-filter-item.component.css']
})
export class LetterFilterItemComponent implements OnInit {
  @Output() letterClicked = new EventEmitter<string>();
  // @ViewChild(this.letterStr) letterInput;
  @Input('fltElement') letter: string;
  letterStr: string = '';

  @ViewChild(FilterDirectiveDirective)
  set filterLetter(v: FilterDirectiveDirective) {
    setTimeout(() => {
      this.letterStr = v.filterLetter;
      console.log("selected letter: " + this.letterStr)
    }, 0);
  }

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onLetterClick() {
    console.log("letterclicked: " + this.letterStr);
    this.letterClicked.emit(this.letterStr);
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: { firstLetter: this.letterStr } })
  }
}
