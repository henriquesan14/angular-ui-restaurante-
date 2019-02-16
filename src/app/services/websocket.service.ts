import { Injectable } from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { HomeService } from './home.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(public homeService: HomeService){}

  private serverUrl = 'http://localhost:8080/socket';
  private stompClient;

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          that.atualizaDemanda();
          that.atualizaGarcom();
          that.playAudio();
        }
      });
    });
  }

  atualizaDemanda(){
    this.homeService.atualizaDemandasCozinha()
    .subscribe(() => {});
  }

  atualizaGarcom(){
    this.homeService.atualizaDemandasGarcom()
    .subscribe(() => {});
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../assets/audios/sound.mp3";
    audio.load();
    
    audio.play();
  }



  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
  }

  disconnect(): void {
    this.stompClient.disconnect();
  }

}

