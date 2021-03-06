import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {
  LoadingController,
  NavController,
  ToastController,
  AlertController
} from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ContaDTO } from 'src/app/models/interfaces';
import { API_CONFIG } from 'src/app/services/config/api.config';
import { ContaService } from 'src/app/services/domain/conta.service';

@Component({
  selector: 'app-conta-list',
  templateUrl: './conta-list.page.html',
  styleUrls: ['./conta-list.page.scss']
})
export class ContaListPage implements OnInit {
  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  private mesId: string;
  public items = new Array<ContaDTO>();
  private loading: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private contaService: ContaService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.mesId = this.router.getCurrentNavigation().extras.state.mes;
      }
    });
  }

  ionViewWillEnter() {
    this.loadContas();
  }

  async loadContas() {
    this.contaService.buscarContasPorMes(this.mesId).subscribe(
      items => {
        this.items = items;
      },
      error => { }
    );
  }

  async addConta() {
    const params: NavigationExtras = {
      state: {
        mes: this.mesId
      }
    };
    await this.router.navigate(['/conta'], params);
  }

  async editarConta(id: string) {
    const params: NavigationExtras = {
      state: {
        conta: id
      }
    };
    await this.router.navigate(['/conta'], params);
  }

  async deletarConta(conta: ContaDTO) {

    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: 'Deseja excluir essa conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(conta);
          }
        }

      ]
    });

    alert.present();
  }

  async executeDelete(conta: ContaDTO) {
    await this.presentLoading();
    this.contaService
      .deletarConta(conta.codigo)
      .pipe(finalize(() => this.loading.dismiss()))
      .subscribe(
        () => {
          this.presentToast('Conta excluida com sucesso').then(() => {
            this.loadContas();
          });
        },
        error => { }
      );
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'success'
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
