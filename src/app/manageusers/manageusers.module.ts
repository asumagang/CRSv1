import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageusersRoutingModule } from './manageusers-routing.module';
import { ManageusersComponent } from './manageusers.component';
import { ActiveusersComponent } from './activeusers/activeusers.component';
import { RequestsComponent } from './requests/requests.component';


@NgModule({
  declarations: [ManageusersComponent, ActiveusersComponent, RequestsComponent],
  imports: [
    CommonModule,
    ManageusersRoutingModule
  ]
})
export class ManageusersModule { }
