import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  LoadingController,
  ModalController
} from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { UsuarioDTO } from 'src/app/models/interfaces';
import { UsuarioService } from './../../../services/domain/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss']
})
export class CadastroPage implements OnInit {
  formGroup: FormGroup;
  private loading: any;
  public user: UsuarioDTO = new UsuarioDTO();
  addCan = false;
  isTextFieldType: boolean;

  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.validFields();
  }

  validFields() {
    this.formGroup = this.formBuilder.group({
      codigo: [''],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  async fecharModal() {
    await this.modalController.dismiss();
  }

  async registar() {
    await this.presentLoading();

    this.addCan = true;
    const formValue = this.formGroup.value;

    const user: UsuarioDTO = {
      codigo: formValue.codigo,
      nome: formValue.nome,
      email: formValue.email,
      senha: formValue.senha
    };

    this.usuarioService
      .criarConta(user)
      .pipe(finalize(() => this.loading.dismiss()))
      .subscribe(
        res => {
          if (res) {
            this.showInsertOk();
          }
        },
        error => {
          this.addCan = false;
        }
      );
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Aguarde...'
    });

    return this.loading.present();
  }

  async showInsertOk() {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.fecharModal();
          }
        }
      ]
    });
    await alert.present();
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }
}
