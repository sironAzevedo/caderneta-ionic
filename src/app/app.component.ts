import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { API_CONFIG } from './services/config/api.config';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  profileImage;

  public appPages = [
    {
      title: 'Profile',
      url: '/cadastro',
      icon: 'contacts'
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'analytics'
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'power'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    public router: NavController
  ) {
    this.initializeApp();
    this.profileImage = 'assets/imgs/avatar-blank.jpg';
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.verifyLogin();
    });
  }
}
