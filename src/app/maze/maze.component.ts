import { Observable } from "rxjs";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from "@angular/core";
import { Service } from "../service.service";
import { formCls, HW } from "../form/form.model";

@Component({
  selector: "app-maze",
  templateUrl: "./maze.component.html",
  styleUrls: ["./maze.component.css"],
})
export class MazeComponent implements OnInit, AfterViewInit {
  @ViewChild("canvas", { read: ElementRef }) canvasRef: ElementRef;
  height = 400;
  width = 400;
  private ctx: CanvasRenderingContext2D;

  data;
  borders: HW;
  bricksArray: Array<number> = [];
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

    console.log("canvas size: ", this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
