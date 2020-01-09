import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsertdataRoutingModule } from './insertdata-routing.module';
import { ViewdataComponent } from './viewdata/viewdata.component';
import { RepresentativesComponent } from './representatives/representatives.component';
import { InsertdataComponent } from './insertdata.component';


@NgModule({
  declarations: [ViewdataComponent, RepresentativesComponent,InsertdataComponent],
  imports: [
    CommonModule,
    InsertdataRoutingModule
  ]
})
export class InsertdataModule { }
