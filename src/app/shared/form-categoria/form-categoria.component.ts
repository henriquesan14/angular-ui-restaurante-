import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CategoriaDTO } from 'src/app/models/categoria.dto';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {

  
  title: string;
  btn: string;
  @Input() loader = false;
  @Input() categoria: CategoriaDTO = <CategoriaDTO>{};
  @Input() id: number;
  @Output() outputCategoria: EventEmitter<CategoriaDTO> = new EventEmitter();

  onSubmit() {
    this.outputCategoria.emit(this.categoria);
  }

  ngOnInit() {
    if (this.id === undefined){
      this.title = 'Nova Categoria';
      this.btn = 'Cadastrar';
    } else {
      this.title = 'Editar Categoria';
      this.btn = 'Editar';
    }
  }

}
