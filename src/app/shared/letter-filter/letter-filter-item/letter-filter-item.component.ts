import {Component, OnInit, Output, ViewChild, EventEmitter, Input} from '@angular/core';
import {FilterDirectiveDirective} from "../../filter-directive.directive";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-letter-filter-item',
  templateUrl: './letter-filter-item.component.html',
  styleUrls: ['./letter-filter-item.component.css']
})
export class LetterFilterItemComponent implements OnInit {
  @Input('fltElement') letter: string;
  letterStr: string = '';

  @ViewChild(FilterDirectiveDirective)
  set filterLetter(v: FilterDirectiveDirective) {
    setTimeout(() => {
      this.letterStr = v.filterLetter;
    }, 0);
  }

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onLetterClick() {
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: { firstLetter: this.letterStr } })
  }
}
