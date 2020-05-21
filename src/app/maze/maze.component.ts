import { Component, OnInit } from '@angular/core';
import { Service } from '../service.service'
import { formCls} from '../form/form.model'

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit {
  data: formCls;
  borders: any;
  constructor(private service:  Service) { }
  
  width: number;
  height: number;

  ngOnInit(): void {
    
    
  }


  setWidthAndHeigth() {
    this.service.dataArr$.subscribe(
      // data => console.log(data),
      data => {this.height = data['height']; this.width = data['width']}
    )
  }


}
