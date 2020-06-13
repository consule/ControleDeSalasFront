import { Component, OnInit } from '@angular/core';
import { AgendamentosEndSalasModel } from '../model/agendamentosEndSalasModel';
import { AgendamentosEndSalasService } from '../services/agendamentos-end-salas.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private agendamentosEndSalasService: AgendamentosEndSalasService) { }

  agendamentosEndSalasModel: AgendamentosEndSalasModel[];

  ngOnInit() {
    this.agendamentosEndSalasService.getAgendamentosEndSalas().subscribe(res => {
      this.agendamentosEndSalasModel = res;
      console.log(res);
    });
  }

}
