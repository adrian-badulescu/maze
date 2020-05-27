
export class formCls {
    id: string;
    width: number;
    height: number;
    start: number;
    end: number;
    density: number;

}

// export class Canvas {
//     height: number;
//     width: number;

//     constructor(h, w){
//         this.height = h
//     }
// }

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
   
    constructor(x,y) {
        this.x = x;
        this.y = y;
        
    }
  
}


