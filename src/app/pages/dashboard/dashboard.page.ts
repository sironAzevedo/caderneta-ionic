import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DashboardDTO } from '../../models/interfaces';
import { API_CONFIG } from '../../services/config/api.config';
import { DashboardService } from '../../services/domain/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  public items = new Array<DashboardDTO>();

  constructor(
    public router: Router,
    public dashboard: DashboardService) { }

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.dashboard.findAll().subscribe(response => {
      this.items = response;
      console.log(response);
    },
      error => { });
  }


  async contas(mes: string) {
    let params: NavigationExtras = {
      state: {
        mes: mes
      }
    }
    await this.router.navigate(['/contas'], params);
  }
}
