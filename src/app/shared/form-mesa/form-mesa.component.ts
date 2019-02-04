import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MesaDTO } from 'src/app/models/mesa.dto';

@Component({
  selector: 'app-form-mesa',
  templateUrl: './form-mesa.component.html',
  styleUrls: ['./form-mesa.component.css']
})
export class FormMesaComponent implements OnInit {

  title: string;
  btn: string;
  @Input() mesa: MesaDTO = <MesaDTO>{};
  @Input() id: number;
  @Output() outputMesa: EventEmitter<MesaDTO> = new EventEmitter();

  onSubmit() {
    this.outputMesa.emit(this.mesa);
  }

  ngOnInit() {
    if (this.id === undefined){
      this.title = 'Nova Mesa';
      this.btn = 'Cadastrar';
    } else {
      this.title = 'Editar Mesa';
      this.btn = 'Editar';
    }
  }

}
