import { Component, OnInit } from '@angular/core';
import { SalaModel } from '../model/salaModel';
import { SalasService } from '../services/Salas.service';
import { insereAgendamentoModel } from '../model/insereAgendamentoModel';
import { InsereAgendamentoService } from '../services/insere-agendamento.service';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NotifierService } from 'angular-notifier';
import { NgxNotifierService } from 'ngx-notifier';



@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css'],
  providers: []
})
export class SalasComponent implements OnInit {

  private notifier: NotifierService;

  formularioDeAgendamentoSala: FormGroup;

  constructor(
    private ngxNotifierService: NgxNotifierService,
    notifier: NotifierService,
    private fb: FormBuilder,
    private salaSevice: SalasService,
    private insereAgendamentoService: InsereAgendamentoService) {
    this.notifier = notifier;
  }

  salaModel: SalaModel[];
  insereAgendamentoModel: insereAgendamentoModel[];

  ngOnInit() {
    this.criarFormularioDeAgendamentoSala();
    this.salaSevice.getSala().subscribe(res => {
      this.salaModel = res;
    });
  }

  limpaCampos(valor) {
    if (valor == 1) {
      this.formularioDeAgendamentoSala.controls['titulo'].reset();
      this.formularioDeAgendamentoSala.controls['dataHoraInicial'].reset();
      this.formularioDeAgendamentoSala.controls['dataHoraFinal'].reset();
    }
  }
  // Insere um novo agendamento
  insereAgendamentoSala() {
    const dadosFormulario = this.formularioDeAgendamentoSala.value;
    if ((Date.parse(dadosFormulario.dataHoraFinal)) < (Date.parse(dadosFormulario.dataHoraInicial))) {
      this.ngxNotifierService.createToast('A data final não pode ser menor que a data inicial', 'danger', 5000);

      return false;
    }
    const ch: insereAgendamentoModel = {
      idSala: parseInt(dadosFormulario.idSala),
      titulo: dadosFormulario.titulo,
      dataHoraInicial: dadosFormulario.dataHoraInicial,
      dataHoraFinal: dadosFormulario.dataHoraFinal
    }
    /// Busca agendamentos existentes conforme requisilçao do usuário. 
    this.salaSevice.getAgendamentosExistentes(dadosFormulario.idSala, dadosFormulario.dataHoraInicial, dadosFormulario.dataHoraFinal).subscribe(res => {
      this.insereAgendamentoModel = res;
      if (this.insereAgendamentoModel.length == 0 || this.insereAgendamentoService == undefined) {
        this.insereAgendamentoService.insereAgendamentoDeSala(ch).subscribe(sucesso => {
          this.insereAgendamentoModel = sucesso;
          this.ngxNotifierService.createToast('Inserido Com Sucesso', 'success', 5000);
        });
      } else {
        this.insereAgendamentoModel = res;
      }
    });
    var controle = 1;
  }

  // Validação dos campos do Formulário
  criarFormularioDeAgendamentoSala() {
    this.formularioDeAgendamentoSala = this.fb.group({
      idSala: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      titulo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]),
      ],
      dataHoraInicial: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      dataHoraFinal: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
    });
  }
}
