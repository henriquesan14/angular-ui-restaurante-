import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private serverUrl = 'http://localhost:8080/socket'
  private stompClient;

  countPedidos: number;
  countItens: number;
  cozinha: number;
  garcom: number;
  public msg;
  constructor(private homeService: HomeService) { 
    this.initializeWebSocketConnection();
  }

  ngOnInit() {
    this.countItensDiario();
    this.countPedidosDiario();
    this.demandasCozinha();
    this.demandasGarcom();
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

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          console.log('recebido: '+message.body);
        }
      });
    });
  }

  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
    console.log('enviado: '+message);
  }


}
