import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-barra-navegacao',
  templateUrl: './barra-navegacao.component.html',
  styleUrls: ['./barra-navegacao.component.css']
})
export class BarraNavegacaoComponent implements OnInit {


  // tslint:disable-next-line:no-output-on-prefix
  @Output() onToggle = new EventEmitter();

  usuario: Usuario = <Usuario>{perfis: []};
  constructor(public homeService: HomeService,
    public usuarioService: UsuarioService,
    private storage: StorageService) {
     }

     

  ngOnInit() {
    this.findUser();
  }

  findUser(){
    const user = this.storage.getLocalUser();
    if(user && user.email) {
      this.usuarioService.findByEmail(user.email)
      .subscribe((response: Usuario) => {
        this.usuario = response;
        if(this.isFuncionario(response.perfis)){
          this.atualizaDemandasCozinha();
          this.atualizaDemandasGarcom();
        }
      } );
    }
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

  hasRole(roles: string[]): boolean {
    let ok = false;
    for (const roleUsuario of this.usuario.perfis) {
      for (const roleBuscada of roles) {
        if (roleBuscada === roleUsuario) {
          ok = true;
          break;
        }
      }
    }
    return ok;
  }

  atualizaDemandasCozinha(){
    this.homeService.atualizaDemandasCozinha()
    .subscribe(() => {});
  }
  
  atualizaDemandasGarcom(){
    this.homeService.atualizaDemandasGarcom()
    .subscribe(() => {});
  }


  disparaEvento() {
    this.onToggle.emit();
  }

}
