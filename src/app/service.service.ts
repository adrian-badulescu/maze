import { Injectable } from '@angular/core';


import { BehaviorSubject, Observable, from, of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class Service {

  data: any;
  dataArr$: Observable<any[]>;
  brickArr: Array<number> = [];


  constructor() { }


  calcStyles(formValue): Observable<any> {

    const dataArr = [];

    dataArr.push(formValue);

    return this.dataArr$ = from(dataArr);

  }

  range(start, end): Array<number> {
    let arr = [];
    for (let i = start; i < end; i++) {
      arr.push(i);
    }
    return this.brickArr = arr;
  }

  




}
