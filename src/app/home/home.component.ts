import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;

    public barChartOptions: ChartOptions = {
        responsive: true,
      };
      public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      public barChartType: ChartType = 'bar';
      public barChartLegend = true;
    
      public barChartData: ChartDataSets[] = [
        { data: [65000, 59000, 80000, 8100, 56000, 55000, 40000], label: 'Number of Beneficiaries' },
        { data: [28000, 48000, 40000, 19000, 86000, 27000, 90000], label: 'Amount Disbursed' }
      ];
    
      public barChartColors: Color[] = [
        { backgroundColor: '#0D9FF7 ' },
        { backgroundColor: '#4DEF25 ' },
      ]
    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }
}