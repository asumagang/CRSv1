import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageusersComponent } from './manageusers.component';
import { ActiveusersComponent } from './activeusers/activeusers.component';
import { RequestsComponent } from './requests/requests.component';


const routes: Routes = [
  {
    path: '', component: ManageusersComponent, children: [
      {
        path: 'activeusers', component: ActiveusersComponent
      },
      {
        path: 'requests', component: RequestsComponent
      },
      {
        path: '', redirectTo: 'activeusers', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageusersRoutingModule { }
