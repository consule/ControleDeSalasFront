import { Component, OnInit } from '@angular/core';
import { SalaModel } from '../model/salaModel';
import { SalasService } from '../services/Salas.service';


@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  constructor(private salaSevice: SalasService) {

  }

  salaModel: SalaModel[];

  ngOnInit() {

    this.salaSevice.getSala().subscribe(res => {
      this.salaModel = res;
      console.log(res);
    });
  }

}
