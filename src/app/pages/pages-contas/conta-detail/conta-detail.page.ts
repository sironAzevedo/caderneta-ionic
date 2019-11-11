import { DateFormatPipe } from './../../../shared/pipes/dateFormatPipe';
import { Component, OnInit, NgZone } from '@angular/core';
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
  inputParcelado = true;
  radioValue: string;
  private mesId: string;
  private conta: string;
  titulo: string = 'nova conta';
  btnName: string = 'salvar';

  constructor(
    dateAdapter: DateAdapter<NativeDateAdapter>,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public contaService: ContaService,
    public router: Router,
    private route: ActivatedRoute,
    private dateFormat: DateFormatPipe,
    public ngZone: NgZone
  ) {
    dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.validFields();
    this.contaService.tipoContas().subscribe(result => this.tipoContas = result);
    this.contaService.statusConta().subscribe(result => this.statusConta = result);
    this.loadConta();
  }

  validFields() {
    this.formGroup = this.formBuilder.group({
      codigo: [''],
      tipoConta: ['', Validators.required],
      valorConta: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      dataPagamento: [''],
      statusConta: ['', Validators.required],
      qtdParcelas: [1, Validators.min(1)],
      comentario: ['']
    });
  }

  loadConta() {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.mes) {
          this.mesId = this.router.getCurrentNavigation().extras.state.mes;
        } else if (this.router.getCurrentNavigation().extras.state.conta) {
          this.titulo = 'editar conta'
          this.btnName = 'Atualizar';
          this.conta = this.router.getCurrentNavigation().extras.state.conta;
          this.contaService.buscarConta(this.conta).subscribe(res => {
            this.formGroup.controls['tipoConta'].setValue(res.tipoConta.codigo);
            this.formGroup.controls['valorConta'].setValue(res.valorConta);
            this.formGroup.controls['dataVencimento'].setValue(new Date(this.dateFormat.transform(res.dataVencimento)));
            this.formGroup.controls['dataPagamento'].setValue(new Date(this.dateFormat.transform(res.dataPagamento)));
            this.formGroup.controls['statusConta'].setValue(res.status.codigo);
            this.formGroup.controls['qtdParcelas'].setValue(res.qtdParcelas);
            this.formGroup.controls['comentario'].setValue(res.comentario);
            this.mesId = res.mes.codigo;
          });
        }
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

    this.saveOrUpdate(conta);
  }

  saveOrUpdate(conta: ContaDTO) {
    if (this.conta) {
      conta.codigo = this.conta,
        this.contaService.atualizarConta(conta)
          .pipe(
            delay(2000),
            finalize(() => this.loading.dismiss()))
          .subscribe(
            (res) => {
              this.showInsertOk('Atualização realizada com sucesso');
            },
            error => {
              this.addCan = false;
            }
          );
    } else {
      this.contaService.salvarConta(conta)
        .pipe(
          delay(2000),
          finalize(() => this.loading.dismiss()))
        .subscribe(
          (res) => {
            this.showInsertOk('Cadastro realizado com sucesso');
          },
          error => {
            this.addCan = false;
          }
        );
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Aguarde...'
    });

    return this.loading.present();
  }

  async showInsertOk(mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: mensagem,
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
    this.ngZone.run( ()=> this.router.navigate(['/contas'], params)  ).then();
    ;
  }

  isParcelado(event: KeyboardEvent) {
    const formValue = this.formGroup.value;
    if (formValue.statusConta === 4) {
      this.inputParcelado = false;
    } else {
      this.inputParcelado = true;
    }

  }

  inputKeyPressAsBrlCurrency(event: KeyboardEvent) {
    const patternBeforeComma = /[0-9,]/;
    const patternAfterComma = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    const eventTarget = event.target as HTMLInputElement;
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
//      .replace(',', '.')
      ;
  } 
}
