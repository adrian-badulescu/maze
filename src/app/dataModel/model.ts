
export class formCls {
    id: string;
    width: number;
    height: number;
    start: number;
    end: number;
    density: number;

}


export class HW {
    height: string;
    width: string;

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
    colWidth: number;
    colHeight: number;
   
    constructor(x: number, y: number, colWidth: number, colHeight: number) {
        this.x = x;
        this.y = y;
        this.X = x * colWidth;
        this.Y = y * colHeight;
        this.colWidth = colWidth;
        this.colHeight = colHeight;
        
    }
  
}


