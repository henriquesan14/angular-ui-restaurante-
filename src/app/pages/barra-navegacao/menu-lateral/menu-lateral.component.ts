import { Component, OnInit, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  usuario: Usuario = <Usuario>{perfis: []};
  menuAberto = true;
  constructor(private auth: AuthService,
     private router: Router,
      private storage: StorageService,
     public usuarioService: UsuarioService,
     private toastr: ToastrService) { }
  opProdutos = false;
  opMesas = false;
  opPedidos = false;
  opCategorias = false;
  opProfile = false;
  opUsuarios = false;
  opDemandas = false;
  largura = window.innerWidth;


  ngOnInit() {
    this.findUser();
    if (this.largura < 900) {
      this.menuAberto = false;
    }
    this.atualizarUsuario();
  }

  atualizarUsuario() {
    const user = this.storage.getLocalUser();
    this.usuarioService.atualizarUsuario(user.email)
      .subscribe(
        () => { },
        () => {
        });
  }

  findUser(){
    const user = this.storage.getLocalUser();
    if(user && user.email) {
      this.usuarioService.findByEmail(user.email)
      .subscribe((response: Usuario) => {this.usuario = response;} );
    }
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

  logout(){
    this.auth.logout();
    this.toastr.success('Desconectado!', 'Sucesso');
    this.router.navigateByUrl('');
  }

  toggle(){
    this.menuAberto = !this.menuAberto;
  }

  toggle1(){
    this.opProdutos = !this.opProdutos;
  }

  toggle2(){
    this.opCategorias = !this.opCategorias;
  }

  toggle3(){
    this.opMesas = !this.opMesas;
  }

  toggle4(){
    this.opPedidos = !this.opPedidos;
  }

  toggle5(){
    this.opProfile = !this.opProfile;
  }

  toggle6(){
    this.opUsuarios = !this.opUsuarios;
  }

  toggle7(){
    this.opDemandas = !this.opDemandas;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      // tslint:disable-next-line:no-unused-expression
      event.target.innerWidth;
      if (window.innerWidth < 900){
        this.menuAberto = false;
      } else {
        this.menuAberto = true;
      }
  }

}
