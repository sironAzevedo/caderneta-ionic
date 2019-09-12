import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ModalController, NavController, ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { myEnterAnimation } from 'src/app/animations/enter';
import { myLeaveAnimation } from 'src/app/animations/leave';
import { CredenciaisDTO } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CadastroPage } from './../usuario/cadastro/cadastro.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loading: any;
  public user: CredenciaisDTO = {};

  constructor(
    public router: NavController,
    public menu: MenuController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    public modalController: ModalController,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  async login() {
    await this.presentLoading();
    await this.authService.authenticate(this.user)
      .pipe(finalize(() => this.loading.dismiss()))
      .subscribe(() => {
        this.router.navigateRoot('/dashboard');
      },
        error => { });
  }

  async registrar() {
    await this.modalController.create({
      component: CadastroPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
    }).then((modal) => {
      modal.present();
    });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Aguarde...'
    });

    return this.loading.present();
  } 
}
