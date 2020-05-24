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
  private formData = new BehaviorSubject<object>(this.data);
  currentData$ = this.formData.asObservable();

  // height: number = null;
  // width: number = null;




  constructor() { }


  calcStyles(formValue) {

    const dataArr = [];

    dataArr.push(...arguments);

    return this.dataArr$ = from(dataArr);

  }

}
