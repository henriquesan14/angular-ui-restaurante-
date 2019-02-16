import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { PedidoService } from 'src/app/services/domain/pedido.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public arrayMes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
'Julho','Agosto','Setembro','Outubro','Setembro','Novembro','Dezembro'];
  public arrayDia = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'];
  countPedidos: number;
  countItens: number;
  cozinha: number;
  garcom: number;
  public nomesProdutos: string[];
  public quantidade: number[];
  public tipoGrafico = 'doughnut';
  public dias: string[];
  public dataAtual = new Date();
  public mesAtual: string;
  public diaSemana: string;
  public tipoGrafico2 = 'line';
  public lineChartData:Array<any>;
  constructor(public homeService: HomeService, 
    private produtoService: ProdutoService,
    private pedidoService: PedidoService) { 
    
  }

  getMesExtenso(mes){
    return this.arrayMes[mes];
  }

  getDiaExtenso(dia){
    return this.arrayDia[dia];
  }

  ngOnInit() {
    this.mesAtual = this.getMesExtenso(this.dataAtual.getMonth());
    this.diaSemana = this.getDiaExtenso(this.dataAtual.getDay());
    this.countItensDiario();
    this.countPedidosDiario();
    this.demandasCozinha();
    this.demandasGarcom();
    this.statisticsProduto();
    this.statisticsPedido();    
   }

   statisticsProduto(){
     this.produtoService.statisticsProduto()
     .subscribe( (response) => {
       this.nomesProdutos = response.map(x => {return x.nome;});
       this.quantidade = response.map(x => {return x.quantidade;});
    },
     (error) => {console.log(error); });
   }

   statisticsPedido(){
    this.pedidoService.statisticsPedido()
    .subscribe( (response) => {
      this.dias = response.map(x => {return x.dia;});
      const totais:number[] = response.map(x => {return x.total});
      this.lineChartData = [
        {data: totais , label: this.mesAtual} 
      ]; 
   },
    (error) => {console.log(error); });
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
