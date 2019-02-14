import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';


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
  constructor(public homeService: HomeService) { 
    
  }

  ngOnInit() {
    this.countItensDiario();
    this.countPedidosDiario();
    this.demandasCozinha();
    this.demandasGarcom();
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
