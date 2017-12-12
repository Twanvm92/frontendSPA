/**
 * Created by twanv on 11-12-2017.
 */
import {Directive, ElementRef, OnInit, Input} from '@angular/core';

@Directive({
  selector: '[appFilter]'
})
export class FilterDirectiveDirective {

  @Input() filterLetter: string;
}
