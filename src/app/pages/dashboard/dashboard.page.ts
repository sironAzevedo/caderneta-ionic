import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DashboardService } from '../../services/domain/dashboard.service';
import { DashboardDTO, TipoContaDTO } from '../../models/interfaces';
import { API_CONFIG } from '../../services/config/api.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: DashboardDTO[];

  constructor(
    public navCtrl: NavController,
    public dashboard: DashboardService) { }

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.dashboard.findAll().subscribe(response => {
      this.items = response;
      console.log(response);
    },
      error => {});
  }


  contas(mes: string) {
    //this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});  
    console.log(mes);
  }

}
