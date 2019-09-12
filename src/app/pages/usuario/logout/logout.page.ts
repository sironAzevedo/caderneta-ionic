import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private authService: AuthService,
    public menu: MenuController) { }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(false);
  }

  ngOnInit() {
    this.menu.get().then((menu: HTMLIonMenuElement) => {
      menu.swipeGesture = false;
    }); 

    this.authService.logout();
  }

}
