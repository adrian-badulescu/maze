import { Observable, from } from "rxjs";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from "@angular/core";
import { Service } from "../service.service";
import { formCls, HW, Cell } from "../form/form.model";

@Component({
  selector: "app-maze",
  templateUrl: "./maze.component.html",
  styleUrls: ["./maze.component.css"],
})
export class MazeComponent implements OnInit, AfterViewInit {
  @ViewChild("canvas", { read: ElementRef }) canvasRef: ElementRef;
  height = 400;
  width = 400;
  totalCols;
  totalRows;

  private ctx: CanvasRenderingContext2D;

  data;
  borders: HW;
  cellsArray: Array<Cell> = [];
  // cellsArray$: Observable<Cell>;
  bordersStr: string;
  blockNumber: Array<number> = [];
  constructor(private service: Service) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const canvasElement: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.ctx = canvasElement.getContext("2d");
    this.ctx.canvas.width = this.width;
    this.ctx.canvas.height = this.height;
  }

  getData() {
    this.service.dataArr$.subscribe((data) => {
      this.data = data;
      this.getWidthAndHeigth(data);
      // this.bricksArray = this.service.range(0, data["density"]);
    });
  }

  getWidthAndHeigth(data): HW {
    const { height, width } = data;
    const px = "px";
    const h = height.toString().concat(px);
    const w = width.toString().concat(px);
    this.drawCanvas(height, width);

    return (this.borders = new HW(h, w));
  }

  drawCanvas(h, w) {
    this.ctx.canvas.height = h;
    this.ctx.canvas.width = w;
    const colWidth = w / 10;
    const rowHeight = h / 10;
    this.totalCols = Math.floor(w / colWidth);
    this.totalRows = Math.floor(h / rowHeight);
    this.generateCells(this.totalCols, this.totalRows);

    console.log(
      `total cols: ${this.totalCols} | total rows: ${this.totalRows}`
    );
    console.log(
      `canvas W: ${this.ctx.canvas.width} | canvas H: ${this.ctx.canvas.height}`
    );
  }

  // x,y cartesians
  generateCells(numberOfCols, numberOfRows): Array<Cell> {
    for (let y = 0; y < numberOfRows; y++) {
      for (let x = 0; x < numberOfCols; x++) {
        // making a new cell for each iteration
        const cell = new Cell(x, y);
        this.cellsArray.push(cell);
      }
    }
    return this.cellsArray;
  }

  iterateCells(cells: Array<Cell>) {
    const arrLen: number = cells.length;
    for (let i = 0; i < arrLen; i++) {
      cells[i]
    }
  }

  showCells(x: number,y: number,w: number,h: number) {
    
    this.ctx.strokeRect(x,y,w,h);
    this.ctx.strokeStyle = 'red';
  }
}
