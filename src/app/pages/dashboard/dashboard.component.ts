import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private websocket: WebsocketService) { }

  ngOnInit() {
    this.websocket.initializeWebSocketConnection();
  }

  

}
