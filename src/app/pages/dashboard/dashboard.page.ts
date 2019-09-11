import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { DashboardService } from '../../services/domain/dashboard.service';
import { DashboardDTO, TipoContaDTO } from '../../models/interfaces';
import { API_CONFIG } from '../../services/config/api.config';
import { AuthService } from 'src/app/services/auth.service';
import { ContaListPage } from '../pages-contas/conta-list/conta-list.page';
import { myEnterAnimation } from 'src/app/animations/enter';
import { myLeaveAnimation } from 'src/app/animations/leave';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: DashboardDTO[];

  constructor(
    public router: NavController,
    public dashboard: DashboardService,
    private authService: AuthService,
    public modalController: ModalController) { }

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
    //this.router.push('ProdutosPage', {categoria_id: categoria_id});  
    console.log(mes);
    await this.modalController.create({
      component: ContaListPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N',
        'id_mes': mes
      }
    }).then((modal) => {
      modal.present();
    });
  }

}
