import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers';
import { AdminComponent } from './admin/admin.component';
import { Role } from './_models';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { InsertdataComponent } from './insertdata/insertdata.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
},
{
  path: "insertdata",
  loadChildren: () =>
    import(`./insertdata/insertdata.module`).then(m => m.InsertdataModule),
  canActivate: [AuthGuard]
},
{
  path: "manageusers",
  loadChildren: () =>
    import(`./manageusers/manageusers.module`).then(m => m.ManageusersModule)
},
{
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
},
{
  path: 'reports',
  component: ReportsComponent,
  canActivate: [AuthGuard],
  data: { roles: [Role.Admin] }
},
{
    path: 'login',
    component: LoginComponent
},

// otherwise redirect to home
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
