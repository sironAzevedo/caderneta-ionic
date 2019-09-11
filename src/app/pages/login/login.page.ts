import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { finalize } from 'rxjs/operators';

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
    private authService: AuthService) { }

  ngOnInit() {
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

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Aguarde...'
    });

    return this.loading.present();
  }
}
