import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ContaDTO } from 'src/app/models/interfaces';
import { API_CONFIG } from 'src/app/services/config/api.config';
import { ContaService } from 'src/app/services/domain/conta.service';

@Component({
  selector: 'app-conta-list',
  templateUrl: './conta-list.page.html',
  styleUrls: ['./conta-list.page.scss'],
})
export class ContaListPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  private id_mes: string = null;
  public items = new Array<ContaDTO>();
  private loading: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private contaService: ContaService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id_mes = this.router.getCurrentNavigation().extras.state.mes;
      }
    });

    this.loadContas();
  }

  async goBack() {
    this.navCtrl.navigateBack('/dashboard');
  }

  async loadContas() {
    await this.contaService.buscarContasPorMes(this.id_mes).subscribe(items => {
      this.items = items;
      console.log(items);
    },
      error => { });
  }

  addConta() {
    console.log("Nova conta");
  }

  async deletarConta(id: string) {
    console.log("deletar conta");
    await this.presentLoading();
    await this.contaService.deletarConta(id)
      .pipe(finalize(() => this.loading.dismiss()))
      .subscribe(() => {
        this.loadContas();
      },
        error => { });
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message, duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Aguarde...'
    });

    return this.loading.present();
  }

}
