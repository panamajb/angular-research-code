import { Component, OnInit } from '@angular/core';
import {interval, Observable, of} from 'rxjs';
import {map, reduce, tap} from 'rxjs/operators';

@Component({
  selector: 'arc-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit {

  constructor() {
    of(1, 2, 3, 4, 5)
      .pipe(
        tap(x => console.log('1:   ' + x)),
        map(x => x * 3 + 2),
        reduce((x, y) => x + y),
        map(x => x + 100),
        tap(x => console.log('2:   ' + x))
      ).subscribe();

    of('a', 'b', 'c')
      .pipe(
        tap(x => console.log(x)),
        map(x => x),
        reduce((x, y) => x + y),
        tap(x => console.log(x))
      ).subscribe();



  }

  ngOnInit(): void {
  }

}
