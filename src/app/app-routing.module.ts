import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent} from './form/form.component';
import { MazeComponent } from './maze/maze.component';


const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'maze', component: MazeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
