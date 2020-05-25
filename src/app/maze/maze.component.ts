import { Observable } from 'rxjs';
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
  bricksArray: Array<number> = [];
  bordersStr: string;
  width: number = 200;
  height: number = 200;
  blockNumber: Array<number> = [];
  constructor(private service: Service) { }




  ngOnInit() {

  }


 getData() {
    this.service.dataArr$.subscribe(
      data => this.data = data
    );
    this.getWidthAndHeigth(this.data);
    this.service.range(0, this.data['density']).subscribe(
      data => this.bricksArray = data
      // data => console.log(data)
    );
    console.log(this.bricksArray)
  }
  getWidthAndHeigth(data): HW {
    const {height, width} = data;
    const px = 'px';
    const _borders = {height, width};
    
    let h = (_borders.height).toString().concat(px);
    let w = (_borders.width).toString().concat(px);
  
    
    return this.borders = new HW(h,w);
    
  }
 
 

}
