import { Component, OnInit} from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formSenha: FormGroup;
  usuario: Usuario = <Usuario>{};
  formEnd: FormGroup;
  id: string;
  public maskFone = [ '(', /[0-9]/, /\d/, ')', /\d/, /\d/, /\d/ , /\d/, /\d/, '-', /\d/, /\d/, /\d/ , /\d/];


  constructor(private storage: StorageService,
     private usuarioService: UsuarioService,
     private formBuilder: FormBuilder,
     private auth: AuthService,
     private toastr: ToastrService) { }

  ngOnInit() {
    this.configuraFormSenha();
    this.findUser();
  }

  atualizarUsuario() {
    const user = this.storage.getLocalUser();
    this.usuarioService.atualizarUsuario(user.email)
      .subscribe(
        () => { },
        () => {
        });
  }

  trocaId(id: string){
    this.id = id;
  }

  updateUsuario(){
    this.usuarioService.update(this.usuario.id, this.usuario)
    .subscribe((response) => {
      if (response.headers.get('Authorization')){
        this.auth.successFullLogin(response.headers.get('Authorization'));
      }
      this.atualizarUsuario();
      this.toastr.success('Dados atualizados!', 'Sucesso');
    }, (error) => {this.toastr.error(error.error.message); });
  }

  configuraFormSenha(){
    this.formSenha = this.formBuilder.group({
      senhaAtual: [null, [Validators.minLength(6), Validators.maxLength(40), Validators.required]],
      novaSenha: [null, [Validators.minLength(6), Validators.maxLength(40), Validators.required]],
      confirmSenha: [null, [Validators.minLength(6), Validators.maxLength(40), Validators.required]]
    });
  }

  findUser() {
    const user = this.storage.getLocalUser();
    this.usuarioService.findByEmail(user.email)
    .subscribe((response: Usuario) => {this.usuario = response; },
    (error) => {console.log(error); });
  }

  update() {
    this.findUser();
    this.toastr.success('Endereço adicionado com sucesso');
  }

  updatePassword() {
    this.usuarioService.updatePassword(this.formSenha.value)
    .subscribe(() => {this.formSenha.reset(); this.toastr.success('Senha atualizada!', 'Sucesso');  },
    (error) => {
      this.toastr.error(error.error.message, 'Falha'); });
  }

  addEndereco(formEnd: FormGroup){
        this.usuarioService.addEndereco(this.usuario.id, formEnd.value)
      .subscribe(() => {
        this.toastr.success('Endereço salvo com sucesso');
        formEnd.reset();
        this.findUser(); },
      () => {this.toastr.error('Erro ao adicionar endereço'); });
  }

  deleteEndereco(){
    this.usuarioService.deleteEndereco(this.usuario.id, this.id)
    .subscribe( () => { 
      this.toastr.success('Endereço apagado com sucesso');
      this.findUser();
  }, (error) => {this.toastr.error('Erro ao apagar endereço');});
  }

}
