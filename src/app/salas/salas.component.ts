import { Component, OnInit, Pipe } from '@angular/core';
import { SalaModel } from '../model/salaModel';
import { SalasService } from '../services/Salas.service';
import { insereAgendamentoModel } from '../model/insereAgendamentoModel';
import { InsereAgendamentoService } from '../services/insere-agendamento.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs/operators';


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
  // getAgendamentosExistentes() {
  //   const dadosFormulario = this.formularioDeAgendamentoSala.value;
  //   if ((Date.parse(dadosFormulario.dataHoraFinal)) < (Date.parse(dadosFormulario.dataHoraInicial))) {
  //     alert('A data final não pode ser menor que a data inicial')
  //     return false;
  //   }

  //   const ch: insereAgendamentoModel = {
  //     idSala: parseInt(dadosFormulario.idSala),
  //     titulo: dadosFormulario.titulo,
  //     dataHoraInicial: dadosFormulario.dataHoraInicial,
  //     dataHoraFinal: dadosFormulario.dataHoraFinal
  //   }

  //   this.salaSevice.getAgendamentosExistentes(dadosFormulario.idSala, dadosFormulario.dataHoraInicial, dadosFormulario.dataHoraFinal).subscribe(res => {
  //     this.insereAgendamentoModel = res;
  //   });
  // }

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

    //   getDadosCorrecaoNaoFinalizadas() {
    //   this.TerceiraCorrecaoDadosService.GetDadosCorrecaoNaoFinalizadas(this.idUsuario).subscribe(result => {
    //     this.listaCorrecoesNaoFinalizadas = result;
    //     //console.log(this.listaCorrecoesNaoFinalizadas)

    //     if (this.listaCorrecoesNaoFinalizadas[0].length == 0) {
    //       this.showBotaoFinalizar = false;
    //     } else {
    //       this.showBotaoFinalizar = true;
    //     }
    //   });
    // }


    ///  Se este não trouxer nada 
    this.salaSevice.getAgendamentosExistentes(dadosFormulario.idSala, dadosFormulario.dataHoraInicial, dadosFormulario.dataHoraFinal).subscribe(res => {
      this.insereAgendamentoModel = res;
      if (this.insereAgendamentoModel.length == 0 || this.insereAgendamentoService == undefined) {
        this.insereAgendamentoService.insereAgendamentoDeSala(ch).subscribe(sucesso => {
          this.insereAgendamentoModel = sucesso;
        });
      } else {
        this.insereAgendamentoModel = res;
      }
    });



    //this.ngOnInit();
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
