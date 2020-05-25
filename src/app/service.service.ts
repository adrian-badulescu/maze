import { Injectable } from '@angular/core';
import { formCls, HW } from './form/form.model'
// import { BehaviorSubject } from 'rxjx/BehaviorSubject';
import { BehaviorSubject, Observable, from, of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class Service {

  data: any;

  dataArr$: Observable<any[]>;
  brickArr$: Observable<any[]>;
  private formData = new BehaviorSubject<object>(this.data);
  currentData$ = this.formData.asObservable();


  constructor() { }


  calcStyles(formValue) {

    const dataArr = [];

    dataArr.push(...arguments);

    return this.dataArr$ = from(dataArr);

  }

  range(start, end) {
    let arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return this.brickArr$ = from(arr);
  }




}
