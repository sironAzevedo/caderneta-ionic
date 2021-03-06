import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DashboardDTO } from '../../models/interfaces';
import { API_CONFIG } from '../../services/config/api.config';
import { DashboardService } from '../../services/domain/dashboard.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  public items = new Array<DashboardDTO>();

  constructor(
    public router: Router,
    public dashboard: DashboardService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.dashboard.findAll().subscribe(
      response => {
        this.items = response;
      },
      error => { }
    );
  }

  async contas(m: string) {
    const params: NavigationExtras = {
      state: {
        mes: m
      }
    };
    await this.router.navigate(['/contas'], params);
  }

  async addConta() {
    await this.router.navigate(['/conta']);
  }
}
