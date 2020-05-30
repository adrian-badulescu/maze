import { Observable, from } from "rxjs";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { Service } from "../service.service";
import { HW, Cell } from "../dataModel/model";

@Component({
  selector: "app-maze",
  templateUrl: "./maze.component.html",
  styleUrls: ["./maze.component.css"],
})
export class MazeComponent implements OnInit, AfterViewInit {
  @ViewChild("canvas", { read: ElementRef }) canvasRef: ElementRef;
  height: number = 400;
  width: number = 400;
  colWidth: number;
  rowHeight: number;
  totalCols: number;
  totalRows: number;
  visitedCellFlag: boolean = true;

  private ctx: CanvasRenderingContext2D;

  data;
  borders: HW;
  cellsArray: Array<Cell> = [];
  currentCell: Cell;

  bordersStr: string;
  blockNumber: Array<number> = [];
  constructor(private service: Service) {
    // this.currentCell = new Cell(0, 0, this.colWidth, this.rowHeight);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const canvasElement: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.ctx = canvasElement.getContext("2d");
    this.drawCanvas(this.height, this.width);
    // this.ctx.canvas.width = this.width;
    // this.ctx.canvas.height = this.height;
  }

  getData() {
    this.service.dataArr$.subscribe((data) => {
      this.data = data;
      // this.getWidthAndHeigth(data);
      // this.bricksArray = this.service.range(0, data["density"]);
    });
  }

  // getWidthAndHeigth(data): HW {
  //   const { height, width } = data;
  //   const px = "px";
  //   const h = height.toString().concat(px);
  //   const w = width.toString().concat(px);
  //   this.drawCanvas(height, width);

  //   return (this.borders = new HW(h, w));
  // }

  drawCanvas(h, w) {
    this.ctx.canvas.height = h;
    this.ctx.canvas.width = w;
    this.colWidth = w / 10;
    this.rowHeight = h / 10;
    this.totalCols = Math.floor(w / this.colWidth);
    this.totalRows = Math.floor(h / this.rowHeight);
    this.generateCells(this.totalCols, this.totalRows);
    this.iterateCells(this.cellsArray);

    // console.log(
    //   `total cols: ${this.totalCols} | total rows: ${this.totalRows}`
    // );
    // console.log(
    //   `canvas W: ${this.ctx.canvas.width} | canvas H: ${this.ctx.canvas.height}`
    // );
  }

  // x,y cartesians
  generateCells(numberOfCols, numberOfRows): Array<Cell> {
    for (let y = 0; y < numberOfRows; y++) {
      for (let x = 0; x < numberOfCols; x++) {
        // making a new cell for each iteration
        const cell = new Cell(x, y, this.colWidth, this.rowHeight);
        this.cellsArray.push(cell);
      }
    }
    if (this.visitedCellFlag) {
      this.cellsArray[0] = new Cell(0, 0, this.colWidth, this.rowHeight);
    }
    return this.cellsArray;
  }

  iterateCells(cells: Array<Cell>) {
    const arrLen: number = cells.length;

    for (let i = 0; i < arrLen; i++) {
      // console.log(cells[i]);
      this.drawCells(
        cells[i].X,
        cells[i].Y,
        cells[i].colWidth,
        cells[i].colHeight
      );
      // console.log(`X: ${cells[i].x} | Y: ${cells[i].y} | colWidth ${this.colWidth} | rowHeight ${this.rowHeight}`);
    }
    this.currentCell = this.cellsArray[0];
  }

  drawCells(X: number, Y: number, colWidth: number, rowHeight: number) {
    let walls: Array<boolean> = [true, true, true, true];
    console.log(X, Y, colWidth, rowHeight);
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 1;
    if(this.visitedCellFlag) {
      this.ctx.fillRect(0, 0, colWidth, rowHeight);
    }
    // horizontal upper lines
    if (walls[0]) {
      this.ctx.moveTo(X, Y);
      this.ctx.lineTo(X + colWidth, Y);
    }

    // vertical right line
    if (walls[1]) {
      this.ctx.moveTo(X + colWidth, Y);
      this.ctx.lineTo(X + colWidth, Y + rowHeight);
    }

    // horizontal bottom line
    if (walls[2]) {
      this.ctx.moveTo(X + colWidth, Y + rowHeight);
      this.ctx.lineTo(X - colWidth, Y + rowHeight);
    }

    // vertical left line
    if (walls[3]) {
      this.ctx.moveTo(X - colWidth, Y + rowHeight);
      this.ctx.lineTo(X - colWidth, Y - rowHeight);
    }

    // draw the lines
    this.ctx.stroke();

    // draw cell one function
    // this.ctx.strokeRect(X, Y, width, height);
  }
}
