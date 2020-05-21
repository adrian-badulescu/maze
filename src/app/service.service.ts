import { Injectable } from '@angular/core';
import { formCls, HW } from './form/form.model'
// import { BehaviorSubject } from 'rxjx/BehaviorSubject';
import {BehaviorSubject, Observable, from, of} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class Service {

  data: any;
  
  dataArr$: Observable<any[]>;
  private formData = new BehaviorSubject<object>(this.data);
  currentData$ = this.formData.asObservable();

  height:number = null;
  width: number =null;

  


  constructor() { }

  // sendData(data) {
  //   this.currentData$.next(data)
  // }

  calcStyles(height, width) {
   const dataArr = [];

   dataArr.push({
      // id,
      height,
      width
   })
  console.log(dataArr);
   return this.dataArr$ = from(dataArr);
      
  }

}
