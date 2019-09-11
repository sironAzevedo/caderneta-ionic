import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { API_CONFIG } from 'src/app/services/config/api.config';

@Component({
  selector: 'app-conta-list',
  templateUrl: './conta-list.page.html',
  styleUrls: ['./conta-list.page.scss'],
})
export class ContaListPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;
  @Input() id_mes: string;

  constructor(public navParams: NavParams, public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.navParams.get('firstName'));
    console.log(this.navParams.get('id_mes'));
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addConta(){
     console.log("Nova conta");
  }

}
