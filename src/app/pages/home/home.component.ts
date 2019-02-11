import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  total = 0;
  countPedidos: number;
  countItens: number;
  cozinha: number;
  garcom: number;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.totalDiario();
    this.countItensDiario();
    this.countPedidosDiario();
    this.demandasCozinha();
    this.demandasGarcom();
   }

   totalDiario(){
     this.homeService.totalDiario()
     .subscribe((response) => {
      if(response==null){
        this.total = 0;
      }else{
        this.total = response;
      }
      },
     (error) => {console.log(error);});
   }

  countPedidosDiario(){
    this.homeService.countPedidosDiario()
    .subscribe((response) => {this.countPedidos = response;},
    (error) => {console.log(error);});
  }

  countItensDiario(){
    this.homeService.countItensDiario()
    .subscribe((response) => {this.countItens = response;},
    (error) => {console.log(error);});
  }

  demandasCozinha(){
    this.homeService.countDemandas(1)
    .subscribe((response) => {this.cozinha = response;},
    (error) => {console.log(error);});
  }

  demandasGarcom(){
    this.homeService.countDemandas(2)
    .subscribe((response) => {this.garcom = response;},
    (error) => {console.log(error);});
  }

}
