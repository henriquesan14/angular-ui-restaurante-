import { Component, OnInit } from '@angular/core';
import { MesaDTO } from 'src/app/models/mesa.dto';
import { MesaService } from 'src/app/services/domain/mesa.service';


@Component({
  selector: 'app-listagem-mesa',
  templateUrl: './listagem-mesa.component.html',
  styleUrls: ['./listagem-mesa.component.css']
})
export class ListagemMesaComponent implements OnInit {

  mesas: MesaDTO[];
  constructor(private mesaService: MesaService) { }

  ngOnInit() {
    this.findAll();
  }
  
  findAll() {
    this.mesaService.findAll()
    .subscribe((response: MesaDTO[]) => {this.mesas = response; },
    (error) => {console.log(error); });
  }

  existemMesas(): boolean {
    return this.mesas && this.mesas.length > 0;
  }

}
