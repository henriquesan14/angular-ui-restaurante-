import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/domain/usuario.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private websocket: WebsocketService,
    private storage: StorageService,
    private usuarioService: UsuarioService
     ) { }

  ngOnInit() {
      this.findUser();
  }

  findUser(){
    const user = this.storage.getLocalUser();
    this.usuarioService.findByEmail(user.email)
    .subscribe((response) => {
      if(this.isFuncionario(response.perfis)){
        this.websocket.initializeWebSocketConnection();
      }else{
        this.websocket.initializeWebSocketConnectionSemSub();
      }
    },
    () => {});

  }

  isFuncionario(roles: string[]): boolean{
    let ok = false;
    for(const r of roles){
      if(r=='GARCOM' || r=='COZINHEIRO' || r=='ADMIN'){
        ok = true;
        break;
      }
    }
    return ok;
  }
 

}
