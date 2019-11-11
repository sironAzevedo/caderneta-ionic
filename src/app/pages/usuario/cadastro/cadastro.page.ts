import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, ActionSheetController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { UsuarioDTO } from 'src/app/models/interfaces';
import { UsuarioService } from './../../../services/domain/usuario.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss']
})
export class CadastroPage implements OnInit {
  formGroup: FormGroup;
  private loading: any;
  addCan = false;
  isTextFieldType: boolean;
  showItems = true;
  usuario: UsuarioDTO;

  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.validFields();
    this.isUserLogado();
  }

  validFields() {
    this.formGroup = this.formBuilder.group({
      codigo: [''],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
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
            //this.fecharModal();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Escolher Foto',
      buttons: [
        {
          text: 'Tirar Foto',
          icon: 'camera',
          handler: () => {
            console.log('Tirar Foto');
          }
        },
        {
          text: 'Galeria',
          icon: 'folder',
          handler: () => {
            console.log('Galeria');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  isUserLogado(){
    const jwt = this.storage.getLocalUser();
    if(jwt && jwt.email){
      this.usuarioService.findByEmail(jwt.email).subscribe(res => {
        this.usuario = res as UsuarioDTO;
        this.formGroup.controls['nome'].setValue(this.usuario.nome);
        this.formGroup.controls['email'].setValue(this.usuario.email);
        this.formGroup.controls['senha'].setValue(this.usuario.senha);
      });
      this.showItems = false; 
    }
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }
}
