import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertdataComponent } from './insertdata.component';
import { ViewdataComponent } from './viewdata/viewdata.component';
import { RepresentativesComponent } from './representatives/representatives.component';


const routes: Routes = [
  {
    path: '', component: InsertdataComponent, children: [
      {
        path: 'viewdata', component: ViewdataComponent
      },
      {
        path: 'representatives', component: RepresentativesComponent
      },
      {
        path: '', redirectTo: 'viewdata', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsertdataRoutingModule { }
