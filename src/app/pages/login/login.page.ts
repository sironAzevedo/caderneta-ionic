import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ModalController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { myEnterAnimation } from 'src/app/shared/animations/enter';
import { myLeaveAnimation } from 'src/app/shared/animations/leave';
import { CredenciaisDTO } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CadastroPage } from './../usuario/cadastro/cadastro.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  private loading: any;
  public user: CredenciaisDTO = {};

  constructor(
    public router: NavController,
    public menu: MenuController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menu.get().then((menu: HTMLIonMenuElement) => {
      menu.swipeGesture = false;
    });
  }

  ionViewDidLeave() {
    this.menu.get().then((menu: HTMLIonMenuElement) => {
      menu.swipeGesture = true;
    });
  }

  async login() {
    await this.presentLoading();
    this.authService
      .authenticate(this.user)
      .pipe(finalize(() => this.loading.dismiss()))
      .subscribe(() => {
        this.router.navigateRoot('/dashboard');
      }, error => { });
  }

  async registrar() {
    await this.modalController
      .create({
        component: CadastroPage,
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation
      })
      .then(modal => {
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
