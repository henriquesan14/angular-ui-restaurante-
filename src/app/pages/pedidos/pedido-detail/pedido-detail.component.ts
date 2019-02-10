import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedido-detail',
  templateUrl: './pedido-detail.component.html',
  styleUrls: ['./pedido-detail.component.css']
})
export class PedidoDetailComponent implements OnInit {

  pedido: Pedido = <Pedido>{mesa: {}, cliente: {}, itens: [
    {produto: {}}
  ]};
  id: string;
  constructor(private pedidoService: PedidoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.find(this.activatedRoute.snapshot.params.id);
  }

  find(id: string){
    this.pedidoService.find(id)
    .subscribe((response) => {
      this.pedido = response;
    },
    (error) => {console.log(error);});
  }

}
