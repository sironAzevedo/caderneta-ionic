import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CredenciaisDTO } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import * as Typed from 'typed.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {
  private loading: any;
  isValid: boolean;
  isInValid: boolean;

  formGroup: FormGroup;
  addCan = false;

  constructor(
    public router: NavController,
    public menu: MenuController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.validFields(); 
  }

  ionViewWillEnter() {
    this.menu.get().then((menu: HTMLIonMenuElement) => {
      this.menu.enable(false)
    });
  }

  ionViewDidLeave() {
    this.menu.get().then((menu: HTMLIonMenuElement) => {
      this.menu.enable(true)
      menu.swipeGesture = true;
    });
  }

  validFields() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      senha: ['', Validators.required]
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  get isFieldValid() {
    const control = this.f.email;

    if (control.touched || control.value != "") {
      if (control.status === 'VALID') {
        this.isInValid = false;
        return this.isValid = true;
      } else {
        this.isInValid = true;
        return this.isValid = false;
      }
    }
  }

  get isFieldInValid() {
    return this.isInValid;
  }

  async login() {
    await this.presentLoading();
    this.addCan = true;

    const formValue = this.formGroup.value;

    const user: CredenciaisDTO = {
      email: formValue.email,
      senha: formValue.senha
    };

    this.authService
      .authenticate(user)
      .pipe(finalize(() => this.loading.dismiss()))
      .subscribe(
        () => {
          this.router.navigateRoot('/dashboard');
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

  mensagem(){

    const options = {
      stringsElement: '#typed-strings',
      strings: ['Caderneta de Contas', 'Organize suas contas pessoais com o CONTAS DE CASAS'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 200,
      smartBackspace: true,
      fadeOut: true,
      showCursor: false,
      startDelay: 1000,
      loop: true
    }; 
    //const typed = new Typed('.typing-element', options); 
  }
}
