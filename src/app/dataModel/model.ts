export class formCls {
  id: string;
  width: number;
  height: number;
  start: number;
  end: number;
  density: number;
}

export class HW {
  height: number;
  width: number;

  constructor(h, w) {
    this.height = h;
    this.width = w;
  }
}

export class Cell {
  x: number;
  y: number;
  X: number;
  Y: number;
  visited: boolean;
  colWidth: number;
  rowHeight: number;

  constructor(x: number, y: number, colWidth: number, rowHeight: number) {
    this.x = x;
    this.y = y;
    this.X = x * colWidth;
    this.Y = y * rowHeight;
    this.colWidth = colWidth;
    this.rowHeight = rowHeight;
  }



}
