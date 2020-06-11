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
import { element } from "protractor";

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
  

  private ctx: CanvasRenderingContext2D;

  data;
  borders: HW;
  cellsArray: Array<Cell> = [];
  currentCell: Cell;

  bordersStr: string;
  blockNumber: Array<number> = [];
  constructor(private service: Service) {
    // this.height = 400; this.width = 400;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const canvasElement: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.ctx = canvasElement.getContext("2d");
    // this.drawCanvas(this.height, this.width);
  }

  getData() {
    this.service.dataArr$.subscribe((data) => {
      console.log(data);
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
    this.colWidth = w / 10;
    this.rowHeight = h / 10;
    this.totalCols = Math.floor(w / this.colWidth);
    this.totalRows = Math.floor(h / this.rowHeight);
    this.generateCells(this.totalCols, this.totalRows);
    this.iterateCells(this.cellsArray);

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
    this.currentCell = this.cellsArray[0];
    this.currentCell.visited = true;
    console.log(this.currentCell);
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
        cells[i].rowHeight
      );
      // this.currentCell.visited = true;
    }
  }

  drawCells(X: number, Y: number, colWidth: number, rowHeight: number) {
    let walls: Array<boolean> = [true, true, true, true];
    // console.log(X, Y, colWidth, rowHeight);

    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 1;

    if (this.currentCell.visited) {
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

  checkNeigbors(
    x: number,
    y: number,
    cols: number,
    rows: number,
    cellsArray: Array<Cell>
  ) {
    let neighbors: Array<Cell> = [];
    const topCell: Cell = cellsArray[this.getCellIndex(x, y - 1, cols, rows)];
    const rightCell: Cell = cellsArray[this.getCellIndex(x + 1, y, cols, rows)];
    const bottomCell: Cell = cellsArray[this.getCellIndex(x, y + 1, cols, rows)];
    const leftCell: Cell = cellsArray[this.getCellIndex(x - 1, y, cols, rows)];

    if (topCell && !topCell.visited) {
      neighbors.push(topCell);
    }
    if (rightCell && !rightCell.visited) {
      neighbors.push(rightCell);
    }
    if (bottomCell && !bottomCell.visited) {
      neighbors.push(bottomCell);
    }
    if (leftCell && !leftCell.visited) {
      neighbors.push(leftCell);
    }
    if (neighbors.length > 0) {
      let random = this.service.getRandomInt(neighbors.length);
      return neighbors[random];
    } else {
      return undefined;
    }
  }

  getCellIndex(x, y, cols, rows) {
    if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
      return -1;
    }

    return this.x + this.y * this.cols;
  }





}
