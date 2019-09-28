import { DateFormatPipe } from './../../../shared/pipes/dateFormatPipe';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize, delay } from 'rxjs/operators';
import { ContaService } from 'src/app/services/domain/conta.service';
import { ContaDTO, StatusContaDTO, MesDTO } from '../../../models/interfaces';
import { TipoContaDTO } from './../../../models/interfaces';

@Component({
  selector: 'app-conta-detail',
  templateUrl: './conta-detail.page.html',
  styleUrls: ['./conta-detail.page.scss']
})
export class ContaDetailPage implements OnInit {
  tipoContas: TipoContaDTO[] = [];
  statusConta: StatusContaDTO[] = [];
  formGroup: FormGroup;
  private loading: any;
  addCan = false;
  radioValue: string;
  private mesId: string;

  constructor(
    dateAdapter: DateAdapter<NativeDateAdapter>,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public contaService: ContaService,
    public router: Router,
    private route: ActivatedRoute,
    private dateFormat: DateFormatPipe
  ) {
    dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.validFields();
    this.loadMes();
    this.contaService.statusConta().subscribe(result => this.statusConta = result);
    this.contaService.tipoContas().subscribe(result => this.tipoContas = result);
  }

  validFields() {
    this.formGroup = this.formBuilder.group({
      codigo: [''],
      tipoConta: ['', Validators.required],
      valorConta: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      dataPagamento: [''],
      statusConta: ['', Validators.required],
      qtdParcelas: [0],
      comentario: ['']
    });
  }

  loadMes() {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.mesId = this.router.getCurrentNavigation().extras.state.mes;
      }
    });
  }

  salvar() {
    this.addCan = true;
    this.presentLoading();
    const formValue = this.formGroup.value;

    const tipo: TipoContaDTO = {
      codigo: formValue.tipoConta
    }

    const statusConta: StatusContaDTO = {
      codigo: formValue.statusConta
    }

    const mesDTO: MesDTO = {
      codigo: this.mesId
    }

    const conta: ContaDTO = {
      tipoConta: tipo,
      valorConta: this.inputNumberNormalize(formValue.valorConta),
      dataVencimento: this.dateFormat.transform(formValue.dataVencimento),
      dataPagamento: this.dateFormat.transform(formValue.dataPagamento),
      status: statusConta,
      qtdParcelas: formValue.qtdParcelas,
      comentario: formValue.comentario,
      mes: mesDTO
    };

    this.contaService.salvarConta(conta)
    .pipe(
      delay(2000),
      finalize(() => this.loading.dismiss()))
      .subscribe(
        (res) => {
          this.showInsertOk();
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
            this.contasPage();
          }
        }
      ]
    });
    await alert.present();
  }

  async contasPage() {
    const params: NavigationExtras = {
      state: {
        mes: this.mesId
      }
    };
    await this.router.navigate(['/contas'], params);
  }

  inputKeyPressAsBrlCurrency(event: KeyboardEvent) {
    const patternBeforeComma = /[0-9,]/;
    const patternAfterComma = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    const eventTarget =  event.target as HTMLInputElement;
    const fieldClean = this.inputNumberNormalize(eventTarget.value).replace(/\./g, '');

    switch (true) {
      case (eventTarget.value.indexOf(',') !== -1):
        eventTarget.value = eventTarget.value.replace('.,', ',');

        if (!patternAfterComma.test(inputChar)) {
          // caractere não permitido
          event.preventDefault();
        }

        break;

      case (event.key === ','):
        break;

      default:
        if (!patternBeforeComma.test(inputChar)) {
          // caractere não permitido
          event.preventDefault();
          return;
        }

        if (eventTarget.value.indexOf('R$') === -1) {
          eventTarget.value = `R$ ${eventTarget.value}`;
        }

        eventTarget.value = eventTarget.value.replace(/\./g, '');

        switch (true) {
          case (fieldClean.length + 1 > 4 && (fieldClean.length + 1) % 3 === 2):
            eventTarget.value = eventTarget.value.replace(/(R\$ \d{2})([0-9\.]*)/, '$1.$2');
            eventTarget.value = eventTarget.value = eventTarget.value.replace(/(\d{3})/g, '$1.');

            break;

          case (fieldClean.length + 1 > 3 && (fieldClean.length + 1) % 3 === 1):
            eventTarget.value = eventTarget.value.replace(/(R\$ \d{1})([0-9\.]*)/, '$1.$2');
            eventTarget.value = eventTarget.value = eventTarget.value.replace(/(\d{3})/g, '$1.');

            break;

          default:
            eventTarget.value = eventTarget.value = eventTarget.value.replace(/(\d{3})/g, '$1.');
        }

        break;
    }
  }

  inputNumberNormalize(value: string): string {
    return value
      .replace(/^R\$ */, '')
      .replace(/\./g, '')
      .replace(/%/g, '')
      .replace(',', '.');
  }
}
