import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Service } from '../service.service';
import { formCls, HW } from '../form/form.model';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css'],
})
export class MazeComponent implements OnInit, AfterViewInit {
  @ViewChild('ref', { read: ElementRef }) ref: ElementRef;

  data;
  borders: HW;
  bricksArray: Array<number> = [];
  bordersStr: string;
  width: number = 200;
  height: number = 200;
  blockNumber: Array<number> = [];
  constructor(private service: Service) { }

  ngOnInit() { }
  ngAfterViewInit() {
    console.log(this.ref);
  }



  getData() {
    this.service.dataArr$.subscribe((data) => {
      // this.data = data;
      this.getWidthAndHeigth(data);
      this.bricksArray = this.service.range(0, data['density']);
      });
 
  }


  getWidthAndHeigth(data): HW {
    const { height, width } = data;
    const px = 'px';
    const h = height.toString().concat(px);
    const w = width.toString().concat(px);

    return (this.borders = new HW(h, w));
  }




}
