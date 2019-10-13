import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.page.html",
  styleUrls: ["./logout.page.scss"]
})
export class LogoutPage implements OnInit {
  constructor(private authService: AuthService, public menu: MenuController) {}

  ngOnInit() {
    this.menu.get().then((menu: HTMLIonMenuElement) => {
      this.menu.enable(false)
    });

    this.authService.logout();
  }
}
