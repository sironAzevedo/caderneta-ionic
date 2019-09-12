import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { UsuarioDTO } from 'src/app/models/interfaces';
import { UsuarioService } from './../../../services/domain/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  formGroup: FormGroup;
  private loading: any;
  public user: UsuarioDTO = new UsuarioDTO();
  addCan: boolean = false;

  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.validFields();
  }

  validFields() {
    this.formGroup = this.formBuilder.group({
      codigo: [''],
      nome: ['', Validators.required],
      sobreNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
  }

  async fecharModal() {
    await this.modalController.dismiss();
  }

  async registar() {
    this.addCan = true;
    const formValue = this.formGroup.value;
    const user: UsuarioDTO = {
      codigo: formValue.codigo,
      nome: formValue.nome,
      sobreNome: formValue.sobreNome,
      email: formValue.email,
      senha: formValue.senha
    }

    await this.usuarioService.criarConta(user)
      .pipe(finalize(() => {
        this.presentToast("Conta Criada com sucesso");
        this.fecharModal();
      }
      ))
      .subscribe(() => { },
        error => { });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Aguarde...'
    });

    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
