import { Component, Input, EventEmitter, Output} from '@angular/core';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cadastro-endereco',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['./cadastro-endereco.component.css']
})
export class CadastroEnderecoComponent {

  @Input() idUsuario;
  @Output() outputEvent = new EventEmitter();

  constructor(private usuarioService: UsuarioService, private storage: StorageService) { }


  addEndereco(formEnd: FormGroup) {
    this.usuarioService.addEndereco(this.idUsuario, formEnd.value)
    .subscribe(() => {
      formEnd.reset();
      this.outputEvent.emit();
    }, (error) => {console.log(error); });
  }

}
