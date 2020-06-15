import { Component, OnInit, Pipe } from '@angular/core';
import { SalaModel } from '../model/salaModel';
import { SalasService } from '../services/Salas.service';
import { insereAgendamentoModel } from '../model/insereAgendamentoModel';
import { InsereAgendamentoService } from '../services/insere-agendamento.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css'],
  providers: [DatePipe]
})
export class SalasComponent implements OnInit {

  newDate = Date.now();
  saveDate: any;
  formularioDeAgendamentoSala: FormGroup;

  constructor(private datePipe: DatePipe, private fb: FormBuilder, private salaSevice: SalasService, private insereAgendamentoService: InsereAgendamentoService) {

  }

  salaModel: SalaModel[];
  insereAgendamentoModel: insereAgendamentoModel[];


  ngOnInit() {
    this.criarFormularioDeAgendamentoSala();
    this.salaSevice.getSala().subscribe(res => {
      this.salaModel = res;
    });

  }

  //Recupera agendamentos existentes 
  getAgendamentosExistentes() {
    const dadosFormulario = this.formularioDeAgendamentoSala.value;
    if ((Date.parse(dadosFormulario.dataHoraFinal)) < (Date.parse(dadosFormulario.dataHoraInicial))) {
      alert('A data final não pode ser menor que a data inicial')
      return false;
    }
    const ag: insereAgendamentoModel = {
      idSala: parseInt(dadosFormulario.idSala),
      dataHoraInicial: dadosFormulario.dataHoraInicial,
      dataHoraFinal: dadosFormulario.dataHoraFinal
    }
    this.salaSevice.getAgendamentosExistentes(ag.idSala, ag.dataHoraInicial, ag.dataHoraFinal).subscribe(res => {
      console.log(res);
    });
  }

  insereAgendamentoSala() {
    const dadosFormulario = this.formularioDeAgendamentoSala.value;
    if ((Date.parse(dadosFormulario.dataHoraFinal)) < (Date.parse(dadosFormulario.dataHoraInicial))) {
      alert('A data final não pode ser menor que a data inicial')
      return false;
    }
    const ch: insereAgendamentoModel = {
      idSala: parseInt(dadosFormulario.idSala),
      titulo: dadosFormulario.titulo,
      dataHoraInicial: dadosFormulario.dataHoraInicial,
      dataHoraFinal: dadosFormulario.dataHoraFinal
    }
    this.insereAgendamentoService.insereAgendamentoDeSala(ch).subscribe(sucesso => {
      console.log(sucesso);
    });
  }

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
