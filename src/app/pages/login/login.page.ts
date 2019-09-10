import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/app/models/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loading: any;
  public user: CredenciaisDTO = {};

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    private loadingCtrl: LoadingController,) { }

  ngOnInit() {
  }

  async login() {
    await this.presentLoading();

    console.log(this.user);

    try {
      this.navCtrl.navigateRoot('/dashboard');
    } catch (error) {
      console.log(error);
    } finally{
      this.loading.dismiss();
    }
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

}
