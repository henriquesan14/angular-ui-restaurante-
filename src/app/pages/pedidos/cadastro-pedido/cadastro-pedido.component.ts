import { Component, OnInit } from '@angular/core';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { CategoriaService } from 'src/app/services/domain/categoria.service';
import { MesaService } from 'src/app/services/domain/mesa.service';
import { MesaDTO } from 'src/app/models/mesa.dto';

@Component({
  selector: 'app-cadastro-pedido',
  templateUrl: './cadastro-pedido.component.html',
  styleUrls: ['./cadastro-pedido.component.css']
})
export class CadastroPedidoComponent implements OnInit {

  categorias: CategoriaDTO[];
  mesas: MesaDTO[];
  mesaSelecionada: MesaDTO;
  constructor(private categoriaService: CategoriaService, private mesaService: MesaService) { }

  ngOnInit() {
    this.findMesa();
  }

  findByTipo(tipo: number){
    this.categoriaService.findByTipo(tipo)
    .subscribe( (response) => {this.categorias = response;},
    (error) => {console.log(error); });
  }

  findMesa(){
    this.mesaService.findStatus(1)
    .subscribe((response) => {this.mesas = response; },
    (error) => {console.log(error); });
  }



}
