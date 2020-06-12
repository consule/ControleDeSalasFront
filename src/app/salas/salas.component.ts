import { Component, OnInit } from '@angular/core';
import { Sala } from '../model/sala';
import { SalasService } from '../services/Salas.service';


@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  constructor(private salaSevice: SalasService) {

  }

  salaModel: Sala[];

  ngOnInit() {
    this.salaSevice.getSala().subscribe(res => {
      this.salaModel = res;
    });
  }

}
