import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { StatisticsProduto } from 'src/app/models/statistics-produto';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countPedidos: number;
  countItens: number;
  cozinha: number;
  garcom: number;
  public statistics: StatisticsProduto[];
  public nomesProdutos: string[];
  public quantidade: number[];
  public tipoGrafico = 'doughnut';
  constructor(public homeService: HomeService, private produtoService: ProdutoService) { 
    
  }

  ngOnInit() {
    this.countItensDiario();
    this.countPedidosDiario();
    this.demandasCozinha();
    this.demandasGarcom();
    this.statisticsProduto();
   }

   statisticsProduto(){
     this.produtoService.statisticsProduto()
     .subscribe( (response) => {
       this.nomesProdutos = response.map(x => {return x.nome;});
       this.quantidade = response.map(x => {return x.quantidade;});
    },
     (error) => {console.log(error); });
   }

   configura(){
     
   }

   countPedidosDiario() {
    this.homeService.countPedidosDiario()
      .subscribe(
        (response) => { this.countPedidos = response;},
        () => {
        });
    }


  countItensDiario(){
    this.homeService.countItensDiario()
    .subscribe((response) => {this.countItens = response;},
    (error) => {console.log(error);});
  }

  demandasCozinha(){
    this.homeService.countDemandasCozinha()
    .subscribe((response) => {this.cozinha = response;},
    (error) => {console.log(error);});
  }

  demandasGarcom(){
    this.homeService.countDemandasGarcom()
    .subscribe((response) => {this.garcom = response;},
    (error) => {console.log(error);});
  }

  
}
