import { Component, OnInit } from '@angular/core';
import { Service } from '../service.service'
import { formCls, HW } from '../form/form.model'

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit {
  data;
  borders: HW;
  bordersStr: string;
  width: number = 200;
  height: number = 200;
  constructor(private service: Service) { }




  ngOnInit(): void {

  }


 getData() {
    this.service.dataArr$.subscribe(
      data => this.data = data
    );
    this.getWidthAndHeigth(this.data);
  }
  getWidthAndHeigth(data): HW {
    const {height, width} = data;
    this.borders = {height, width};
    console.log(this.borders);
    return this.borders;
    // return this.bordersStr = JSON.stringify(this.borders);
  }
  setWidthAndHeigth(): void {

  }


}
