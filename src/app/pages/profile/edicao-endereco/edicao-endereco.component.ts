import { Component, OnInit} from '@angular/core';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { EnderecoDTO } from 'src/app/models/endereco.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edicao-endereco',
  templateUrl: './edicao-endereco.component.html',
  styleUrls: ['./edicao-endereco.component.css']
})
export class EdicaoEnderecoComponent implements OnInit {

  end: EnderecoDTO = <EnderecoDTO>{} ;
  idUsuario: string;
  idEndereco: string;
  public maskCep = [ /[0-9]/, /\d/, /\d/, /\d/, /\d/ , '-', /\d/, /\d/, /\d/];
  constructor(private usuarioService: UsuarioService,
     private router: Router,
     private activatedRoute: ActivatedRoute,
     private toastr: ToastrService) { }
  ngOnInit() {
    this.idUsuario = this.activatedRoute.snapshot.params.idUsuario;
    this.idEndereco = this.activatedRoute.snapshot.params.idEndereco;
    this.getEndereco(this.activatedRoute.snapshot.params.idUsuario, this.activatedRoute.snapshot.params.idEndereco );
  }

  getEndereco(idUsuario: string, idEndereco: string) {
    this.usuarioService.findEndereco(idUsuario, idEndereco)
    .subscribe((response: EnderecoDTO) => {this.end = response; }, (error) => {console.log(error); });
  }

  updateEndereco() {
    this.usuarioService.updateEndereco(this.idUsuario, this.idEndereco, this.end)
    .subscribe(() => {
      this.toastr.success('Endereço atualizado', 'Sucesso');
     this.router.navigateByUrl('/dashboard/profile');
    }, (error) => {console.log(error);
    this.toastr.error('Falha ao cadastrar', 'Falha'); });
  }

}
